/**
 * Kiosk P2P-Sync-Service.
 *
 * Eigenständige Kopie des Web-P2P-Service für den Kiosk,
 * damit keine cross-app relativen Pfade nötig sind.
 *
 * CRIT-02 fix: Kiosk abonniert jetzt eingehende CellAggregates
 * und zeigt sie auf der Karte an.
 */

import type { CellAggregate, SyncStatus, GeoBoundingBox } from '@peopleseyes/core-model';
import { isCellInBoundingBox, validateCellAggregate } from '@peopleseyes/core-logic';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GunInstance = any;

const BOOTSTRAP_RELAYS = [
  'https://gun-manhattan.herokuapp.com/gun',
  'https://peer.wallie.io/gun',
];
const GUN_NAMESPACE = 'peopleseyes_v1_cells';

export type CellUpdateCallback = (aggregate: CellAggregate) => void;

export class KioskP2PSyncService {
  private gun: GunInstance = null;
  private cellsNode: GunInstance = null;
  private status: SyncStatus = {
    state: 'idle',
    connectedPeers: 0,
    lastSyncAttempt: null,
    pendingReports: 0,
  };
  private listeners = new Set<(status: SyncStatus) => void>();
  private globalCallbacks = new Set<CellUpdateCallback>();
  private subscribedCells = new Set<string>();
  private currentViewport: GeoBoundingBox | null = null;
  private initialized = false;

  async init(): Promise<void> {
    if (this.initialized) return;
    this.initialized = true;
    try {
      const Gun = (await import('gun')).default;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
      this.gun = Gun({ peers: BOOTSTRAP_RELAYS, localStorage: false, radisk: false });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      this.cellsNode = this.gun.get(GUN_NAMESPACE);
      this.updateStatus({ state: 'syncing', lastSyncAttempt: Date.now() });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      this.gun.on('hi', () =>
        this.updateStatus({ connectedPeers: this.status.connectedPeers + 1, state: 'idle' }),
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      this.gun.on('bye', () =>
        this.updateStatus({ connectedPeers: Math.max(0, this.status.connectedPeers - 1) }),
      );
      this.updateStatus({ state: 'idle' });
    } catch (err) {
      console.error('Kiosk P2P init fehlgeschlagen:', err);
      this.updateStatus({ state: 'error' });
    }
  }

  setViewport(bbox: GeoBoundingBox): void {
    this.currentViewport = bbox;
    for (const cellId of this.subscribedCells) {
      if (!isCellInBoundingBox(cellId, bbox)) {
        this.subscribedCells.delete(cellId);
      }
    }
  }

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

  subscribeToCell(cellId: string): void {
    if (!this.cellsNode || this.subscribedCells.has(cellId)) return;
    if (this.currentViewport && !isCellInBoundingBox(cellId, this.currentViewport)) return;

    this.subscribedCells.add(cellId);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    this.cellsNode.get(cellId).on((data: unknown) => {
      if (!validateCellAggregate(data)) return;
      this.globalCallbacks.forEach(cb => cb(data));
    });
  }

  onCellUpdate(callback: CellUpdateCallback): () => void {
    this.globalCallbacks.add(callback);
    return () => this.globalCallbacks.delete(callback);
  }

  onStatusChange(listener: (status: SyncStatus) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  getStatus(): SyncStatus { return this.status; }

  private updateStatus(patch: Partial<SyncStatus>): void {
    this.status = { ...this.status, ...patch };
    this.listeners.forEach(l => l(this.status));
  }

  destroy(): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    this.gun?.off?.();
    this.globalCallbacks.clear();
    this.listeners.clear();
    this.subscribedCells.clear();
    this.initialized = false;
  }
}

export const kioskP2pSync = new KioskP2PSyncService();
