/**
 * P2P-Sync via GUN.js
 *
 * GUN ist ein dezentrales, peer-to-peer Graph-Datenbank-System.
 * Daten werden zwischen Peers synchronisiert ohne zentralen Server.
 *
 * Privacy-Entscheidungen:
 * - Keine Nutzer-Authentifizierung (kein SEA)
 * - Nur aggregierte Zell-Daten werden geteilt, keine Rohdaten
 * - Reports werden lokal erzeugt und als CellAggregates propagiert
 * - Peer-ID ist ephemer und wird nicht gespeichert
 *
 * Fallback-Relays: Öffentliche GUN-Relays für Bootstrap.
 * In Produktion: selbst gehosteter Relay-Server empfohlen.
 */

import type { CellAggregate, SyncStatus, GeoBoundingBox } from '@peopleseyes/core-model';
import { isCellInBoundingBox } from '@peopleseyes/core-logic';

// GUN hat kein offizielles ESM-Modul – dynamischer Import
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GunInstance = any;

/** Öffentliche Bootstrap-Relays – nur für initialen Peer-Discovery */
const BOOTSTRAP_RELAYS = [
  'https://gun-manhattan.herokuapp.com/gun',
  'https://peer.wallie.io/gun',
];

/** GUN-Namespace für PeoplesEyes – isoliert von anderen Apps */
const GUN_NAMESPACE = 'peopleseyes_v1_cells';

/** Maximales Alter eines CellAggregate das akzeptiert wird (2 Stunden) */
const MAX_AGGREGATE_AGE_MS = 2 * 60 * 60 * 1000;

export type CellUpdateCallback = (aggregate: CellAggregate) => void;

export class P2PSyncService {
  private gun: GunInstance = null;
  private cellsNode: GunInstance = null;
  private status: SyncStatus = {
    state: 'idle',
    connectedPeers: 0,
    lastSyncAttempt: null,
    pendingReports: 0,
  };
  private listeners = new Set<(status: SyncStatus) => void>();
  private cellListeners = new Map<string, Set<CellUpdateCallback>>();
  private subscribedCells = new Set<string>();
  private currentViewport: GeoBoundingBox | null = null;
  private globalCallbacks = new Set<CellUpdateCallback>();
  /** BUG-05 fix: Guard gegen Mehrfach-Initialisierung */
  private initialized = false;

  async init(): Promise<void> {
    if (this.initialized) return;
    this.initialized = true;
    try {
      // Dynamischer Import – GUN lädt nur wenn benötigt
      const Gun = (await import('gun')).default;

      this.gun = Gun({
        peers: BOOTSTRAP_RELAYS,
        localStorage: false,
        radisk: false,
      });

      this.cellsNode = this.gun.get(GUN_NAMESPACE);
      this.updateStatus({ state: 'syncing', lastSyncAttempt: Date.now() });

      this.gun.on('hi', () => {
        this.updateStatus({ connectedPeers: this.status.connectedPeers + 1, state: 'idle' });
      });
      this.gun.on('bye', () => {
        this.updateStatus({
          connectedPeers: Math.max(0, this.status.connectedPeers - 1),
        });
      });

      this.updateStatus({ state: 'idle' });
    } catch (err) {
      console.error('P2P init fehlgeschlagen:', err);
      this.updateStatus({ state: 'error' });
    }
  }

  /**
   * Aktualisiert den sichtbaren Kartenausschnitt.
   * Zellen außerhalb werden nicht mehr aktiv abonniert.
   */
  setViewport(bbox: GeoBoundingBox): void {
    this.currentViewport = bbox;
    for (const cellId of this.subscribedCells) {
      if (!isCellInBoundingBox(cellId, bbox)) {
        this.subscribedCells.delete(cellId);
      }
    }
  }

  /**
   * Veröffentlicht ein CellAggregate an alle Peers.
   * Nur aggregierte Daten – keine Rohdaten, keine IDs.
   */
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

    this.cellsNode.get(aggregate.cellId).put(payload);
  }

  /**
   * Abonniert eine Zelle – nur wenn sie im aktuellen Viewport liegt.
   */
  subscribeToCell(cellId: string): void {
    if (!this.cellsNode) return;
    if (this.subscribedCells.has(cellId)) return;
    if (this.currentViewport && !isCellInBoundingBox(cellId, this.currentViewport)) return;

    this.subscribedCells.add(cellId);

    this.cellsNode.get(cellId).on((data: unknown) => {
      if (!data || typeof data !== 'object') return;
      const agg = data as CellAggregate;
      if (Date.now() - agg.lastUpdatedHour > MAX_AGGREGATE_AGE_MS) return;

      this.globalCallbacks.forEach(cb => cb(agg));
      this.cellListeners.get(cellId)?.forEach(cb => cb(agg));
    });
  }

  /** Registriert einen globalen Callback für alle Zell-Updates */
  onCellUpdate(callback: CellUpdateCallback): () => void {
    this.globalCallbacks.add(callback);
    return () => this.globalCallbacks.delete(callback);
  }

  /**
   * Abonniert Updates für eine bestimmte Zelle (Legacy-API für Web).
   */
  subscribeToCellUpdates(cellId: string, callback: CellUpdateCallback): () => void {
    if (!this.cellListeners.has(cellId)) {
      this.cellListeners.set(cellId, new Set());
      this.subscribeToCell(cellId);
    }
    this.cellListeners.get(cellId)!.add(callback);
    return () => {
      this.cellListeners.get(cellId)?.delete(callback);
    };
  }

  onStatusChange(listener: (status: SyncStatus) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  getStatus(): SyncStatus {
    return this.status;
  }

  private updateStatus(patch: Partial<SyncStatus>): void {
    this.status = { ...this.status, ...patch };
    this.listeners.forEach(l => l(this.status));
  }

  destroy(): void {
    this.gun?.off?.();
    this.cellListeners.clear();
    this.listeners.clear();
    this.subscribedCells.clear();
    this.globalCallbacks.clear();
    this.initialized = false;
  }
}

/** Singleton-Instanz */
export const p2pSync = new P2PSyncService();
