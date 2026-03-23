/**
 * Sync- und Queue-Status für lokale/P2P-Synchronisation.
 */

export enum PeerConnectionState {
  Connecting = 'connecting',
  Connected = 'connected',
  Disconnected = 'disconnected',
  Failed = 'failed',
}

export enum OfflineQueueStatus {
  Idle = 'idle',
  Queued = 'queued',
  Flushing = 'flushing',
  Error = 'error',
}

export interface SyncStatus {
  readonly state: 'idle' | 'syncing' | 'error';
  readonly connectedPeers: number;
  readonly lastSyncAttempt: number | null;
  readonly pendingReports: number;
}
