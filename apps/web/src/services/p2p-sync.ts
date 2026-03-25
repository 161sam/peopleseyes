/**
 * P2P-Sync via GUN.js.
 *
 * Ergänzt Relay-Fallback, optionale Tor-Konfiguration und
 * Integritätsprüfung signierter CellAggregates.
 */

import type { CellAggregate, GeoBoundingBox, SyncStatus } from '@peopleseyes/core-model';
import { isCellInBoundingBox, validateCellAggregate } from '@peopleseyes/core-logic';
import {
  generateEphemeralKeypair,
  signMessage,
  verifySignature,
  type EphemeralKeypair,
} from '@peopleseyes/core-crypto';
import { resolveRelayConfig } from './relay-config.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GunInstance = any;

const GUN_NAMESPACE = 'peopleseyes_v1_cells';

export type CellUpdateCallback = (aggregate: CellAggregate) => void;

function aggregateSignatureInput(
  aggregate: Omit<CellAggregate, 'signature' | 'signerPublicKey'>,
): string {
  return [
    aggregate.cellId,
    aggregate.reportCount,
    aggregate.dominantActivityType,
    aggregate.dominantAuthorityCategory,
    aggregate.lastUpdatedHour,
    aggregate.aggregateScore,
  ].join('|');
}

export class P2PSyncService {
  private gun: GunInstance = null;
  private cellsNode: GunInstance = null;
  private keypair: EphemeralKeypair | null = null;
  private resolvedProxyUrl: string | null = null;
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
  private initialized = false;

  async init(): Promise<void> {
    if (this.initialized) return;
    this.initialized = true;

    try {
      this.keypair = await generateEphemeralKeypair();

      const relayConfig = await resolveRelayConfig();
      this.resolvedProxyUrl = relayConfig.proxyUrl;

      if (relayConfig.probeResults.length > 0) {
        const reachable = relayConfig.probeResults.filter(result => result.reachable);
        console.debug(
          `[P2P] Relay-Probe: ${reachable.length}/${relayConfig.probeResults.length} erreichbar.`,
        );
      }

      const Gun = (await import('gun')).default;

      this.gun = Gun({
        peers: relayConfig.peers,
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

  setViewport(bbox: GeoBoundingBox): void {
    this.currentViewport = bbox;
    for (const cellId of this.subscribedCells) {
      if (!isCellInBoundingBox(cellId, bbox)) {
        this.subscribedCells.delete(cellId);
      }
    }
  }

  async publishCellAggregate(aggregate: CellAggregate): Promise<void> {
    if (!this.cellsNode) return;

    const corePayload = {
      cellId: aggregate.cellId,
      reportCount: aggregate.reportCount,
      dominantActivityType: aggregate.dominantActivityType,
      dominantAuthorityCategory: aggregate.dominantAuthorityCategory,
      lastUpdatedHour: aggregate.lastUpdatedHour,
      aggregateScore: aggregate.aggregateScore,
    };

    let signature: string | undefined;
    let signerPublicKey: string | undefined;

    if (this.keypair) {
      try {
        signature = await signMessage(
          aggregateSignatureInput(corePayload),
          this.keypair.privateKey,
        );
        signerPublicKey = this.keypair.publicKeyBase64;
      } catch (err) {
        console.warn('[P2P] Signierung fehlgeschlagen, sende unsigniert:', err);
      }
    }

    const payload = {
      ...corePayload,
      ...(signature ? { signature, signerPublicKey } : {}),
    };

    this.cellsNode.get(aggregate.cellId).put(payload);
  }

  subscribeToCell(cellId: string): void {
    if (!this.cellsNode) return;
    if (this.subscribedCells.has(cellId)) return;
    if (this.currentViewport && !isCellInBoundingBox(cellId, this.currentViewport)) return;

    this.subscribedCells.add(cellId);

    this.cellsNode.get(cellId).on((data: unknown) => {
      if (!validateCellAggregate(data)) return;
      void this.verifyAndDispatch(data as CellAggregate);
    });
  }

  private async verifyAndDispatch(aggregate: CellAggregate): Promise<void> {
    if (!aggregate.signature || !aggregate.signerPublicKey) {
      console.debug('[P2P] Unsigniertes Aggregat verworfen:', aggregate.cellId);
      return;
    }

    const valid = await verifySignature(
      aggregateSignatureInput(aggregate),
      aggregate.signature,
      aggregate.signerPublicKey,
    );

    if (!valid) {
      console.warn('[P2P] Ungültige Signatur verworfen:', aggregate.cellId);
      return;
    }

    this.globalCallbacks.forEach(callback => callback(aggregate));
    this.cellListeners.get(aggregate.cellId)?.forEach(callback => callback(aggregate));
  }

  onCellUpdate(callback: CellUpdateCallback): () => void {
    this.globalCallbacks.add(callback);
    return () => this.globalCallbacks.delete(callback);
  }

  subscribeToCellUpdates(cellId: string, callback: CellUpdateCallback): () => void {
    if (!this.cellListeners.has(cellId)) {
      this.cellListeners.set(cellId, new Set());
      this.subscribeToCell(cellId);
    }

    this.cellListeners.get(cellId)?.add(callback);
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

  getProxyUrl(): string | null {
    return this.resolvedProxyUrl;
  }

  private updateStatus(patch: Partial<SyncStatus>): void {
    this.status = { ...this.status, ...patch };
    this.listeners.forEach(listener => listener(this.status));
  }

  destroy(): void {
    this.gun?.off?.();
    this.cellListeners.clear();
    this.listeners.clear();
    this.subscribedCells.clear();
    this.globalCallbacks.clear();
    this.keypair = null;
    this.resolvedProxyUrl = null;
    this.initialized = false;
  }
}

export const p2pSync = new P2PSyncService();
