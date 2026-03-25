/**
 * P2P-Sync-Service für React Native.
 *
 * Erweitert den Web-P2P-Service um:
 * - Viewport-Filterung: nur Zellen im sichtbaren Kartenausschnitt abonnieren
 * - Notification-Integration: bei neuen Meldungen in der Nähe benachrichtigen
 * - Reconnect-Logik: bei Verbindungsunterbrechung automatisch neu verbinden
 */

import type { CellAggregate, SyncStatus, GeoBoundingBox } from '@peopleseyes/core-model';
import { isCellInBoundingBox, validateCellAggregate } from '@peopleseyes/core-logic';
import {
  isInNotificationRadius,
  notifyNearbyReport,
} from './notification-service.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GunInstance = any;

const BOOTSTRAP_RELAYS = [
  'https://gun-manhattan.herokuapp.com/gun',
  'https://peer.wallie.io/gun',
];
const GUN_NAMESPACE = 'peopleseyes_v1_cells';
const RECONNECT_DELAY_MS = 5_000;
/** Maximale Reconnect-Versuche bevor aufgegeben wird (verhindert unbegrenzte Rekursion) */
const MAX_RECONNECT_ATTEMPTS = 5;

export type CellUpdateCallback = (aggregate: CellAggregate) => void;

export class MobileP2PSyncService {
  private gun: GunInstance = null;
  private cellsNode: GunInstance = null;
  private status: SyncStatus = {
    state: 'idle',
    connectedPeers: 0,
    lastSyncAttempt: null,
    pendingReports: 0,
  };

  /** Aktuell abonnierte Zellen */
  private subscribedCells = new Set<string>();
  /** Aktueller Kartenausschnitt */
  private currentViewport: GeoBoundingBox | null = null;
  /** H3-Zelle des Nutzers für Notification-Radius-Check */
  private userCellId: string | null = null;
  /** Radius für Benachrichtigungen (in H3-Zellen) */
  private notificationRadius = 1;
  /** Globale Callbacks für eingehende Zell-Updates */
  private globalCellCallbacks = new Set<CellUpdateCallback>();
  /** Status-Listener */
  private statusListeners = new Set<(s: SyncStatus) => void>();
  private initialized = false;
  /** HIGH-03 fix: Anzahl bisheriger Reconnect-Versuche */
  private reconnectAttempts = 0;
  /** MED-08 fix: Flag ob destroy() aufgerufen wurde – verhindert Reconnect nach Teardown */
  private destroyed = false;

  async init(): Promise<void> {
    if (this.initialized) return;
    this.initialized = true;
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const Gun = (await import('gun')).default;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
      this.gun = Gun({
        peers: BOOTSTRAP_RELAYS,
        localStorage: false,
        radisk: false,
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      this.cellsNode = this.gun.get(GUN_NAMESPACE);
      this.updateStatus({ state: 'syncing', lastSyncAttempt: Date.now() });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      this.gun.on('hi', () =>
        this.updateStatus({ connectedPeers: this.status.connectedPeers + 1, state: 'idle' }),
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      this.gun.on('bye', () => {
        const peers = Math.max(0, this.status.connectedPeers - 1);
        this.updateStatus({ connectedPeers: peers });
        if (peers === 0) void this.scheduleReconnect();
      });

      this.updateStatus({ state: 'idle' });
    } catch (err) {
      console.error('P2P init fehlgeschlagen:', err);
      this.updateStatus({ state: 'error' });
    }
  }

  /**
   * Aktualisiert den sichtbaren Kartenausschnitt.
   * Bereits abonnierte Zellen außerhalb des Viewports werden abgemeldet.
   */
  setViewport(bbox: GeoBoundingBox): void {
    this.currentViewport = bbox;
    // Zellen außerhalb des Viewports aus subscribedCells entfernen
    for (const cellId of this.subscribedCells) {
      if (!isCellInBoundingBox(cellId, bbox)) {
        this.subscribedCells.delete(cellId);
      }
    }
  }

  /** Setzt die aktuelle Nutzer-Zell-ID für Notification-Radius-Checks */
  setUserCellId(cellId: string | null, radiusCells: number = 1): void {
    this.userCellId = cellId;
    this.notificationRadius = radiusCells;
  }

  /** Veröffentlicht ein CellAggregate an alle Peers */
  publishCellAggregate(aggregate: CellAggregate): void {
    if (!this.cellsNode) return;

    const payload = {
      cellId: aggregate.cellId,
      reportCount: aggregate.reportCount,
      dominantActivityType: aggregate.dominantActivityType,
      dominantAuthorityCategory: aggregate.dominantAuthorityCategory,
      lastUpdatedHour: aggregate.lastUpdatedHour,
      aggregateScore: aggregate.aggregateScore,
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    this.cellsNode.get(aggregate.cellId).put(payload);
  }

  /**
   * Abonniert eine Zelle für Updates.
   * Nur Zellen im aktuellen Viewport werden neu abonniert.
   */
  subscribeToCell(cellId: string): void {
    if (!this.cellsNode) return;
    if (this.subscribedCells.has(cellId)) return;

    // Nur abonnieren wenn im Viewport
    if (this.currentViewport && !isCellInBoundingBox(cellId, this.currentViewport)) return;

    this.subscribedCells.add(cellId);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    this.cellsNode.get(cellId).on((data: unknown) => {
      // SEC-02 fix: strukturelle Validierung vor dem Akzeptieren von P2P-Daten
      if (!validateCellAggregate(data)) return;
      const agg = data;

      // Alle globalen Callbacks aufrufen
      this.globalCellCallbacks.forEach(cb => cb(agg));

      // Benachrichtigung prüfen
      if (isInNotificationRadius(agg, this.userCellId, this.notificationRadius)) {
        void notifyNearbyReport(agg, this.userCellId === agg.cellId ? 0 : 1);
      }
    });
  }

  /** Registriert einen globalen Callback für alle Zell-Updates */
  onCellUpdate(callback: CellUpdateCallback): () => void {
    this.globalCellCallbacks.add(callback);
    return () => this.globalCellCallbacks.delete(callback);
  }

  onStatusChange(listener: (s: SyncStatus) => void): () => void {
    this.statusListeners.add(listener);
    return () => this.statusListeners.delete(listener);
  }

  getStatus(): SyncStatus {
    return this.status;
  }

  private updateStatus(patch: Partial<SyncStatus>): void {
    this.status = { ...this.status, ...patch };
    this.statusListeners.forEach(l => l(this.status));
  }

  private async scheduleReconnect(): Promise<void> {
    // MED-08 fix: kein Reconnect nach destroy()
    if (this.destroyed) return;
    // HIGH-03 fix: Reconnect-Loop nach MAX_RECONNECT_ATTEMPTS beenden
    if (this.reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
      this.updateStatus({ state: 'error' });
      return;
    }
    this.reconnectAttempts++;
    await new Promise<void>(resolve => {
      setTimeout(() => resolve(), RECONNECT_DELAY_MS * this.reconnectAttempts);
    });
    if (!this.destroyed && this.status.connectedPeers === 0) {
      this.initialized = false; // Guard zurücksetzen damit init() läuft
      void this.init();
    }
  }

  destroy(): void {
    this.destroyed = true;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    this.gun?.off?.();
    this.globalCellCallbacks.clear();
    this.statusListeners.clear();
    this.subscribedCells.clear();
    this.initialized = false;
    this.reconnectAttempts = 0;
  }
}

export const mobileP2pSync = new MobileP2PSyncService();
