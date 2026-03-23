import { useState, useEffect, useCallback } from 'react';
import type { CellAggregate, Report } from '@peopleseyes/core-model';
import { nativeReportStore } from '../services/native-report-store.js';
import { mobileP2pSync } from '../services/mobile-p2p-sync.js';

interface UseNativeReportsReturn {
  aggregates: CellAggregate[];
  isLoading: boolean;
  addReport: (report: Report) => Promise<void>;
  error: string | null;
  syncStatus: { connectedPeers: number; state: string };
}

export function useNativeReports(): UseNativeReportsReturn {
  const [aggregates, setAggregates] = useState<CellAggregate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState({ connectedPeers: 0, state: 'idle' });

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        await nativeReportStore.init();
        await mobileP2pSync.init();

        if (!mounted) return;

        const local = await nativeReportStore.computeAllAggregates();
        setAggregates(local);
        setIsLoading(false);

        // P2P-Zell-Updates eingehend mergen
        const unsubCell = mobileP2pSync.onCellUpdate(incoming => {
          setAggregates(prev => {
            const idx = prev.findIndex(a => a.cellId === incoming.cellId);
            if (idx === -1) return [...prev, incoming];
            // Nur aktuellere Daten übernehmen
            if (incoming.lastUpdatedHour >= prev[idx]!.lastUpdatedHour) {
              const next = [...prev];
              next[idx] = incoming;
              return next;
            }
            return prev;
          });
        });

        // Status-Updates
        const unsubStatus = mobileP2pSync.onStatusChange(s => {
          if (!mounted) return;
          setSyncStatus({ connectedPeers: s.connectedPeers, state: s.state });
        });

        // Cleanup
        return () => { unsubCell(); unsubStatus(); };
      } catch (err) {
        if (!mounted) return;
        console.error('Init fehlgeschlagen:', err);
        setIsLoading(false);
      }
    };

    const cleanup = init();
    return () => {
      mounted = false;
      void cleanup.then(fn => fn?.());
    };
  }, []);

  const addReport = useCallback(async (report: Report) => {
    setError(null);
    try {
      await nativeReportStore.addReport(report);
      const updated = await nativeReportStore.computeAllAggregates();
      setAggregates(updated);

      // Neue Zelle für P2P abonnieren
      mobileP2pSync.subscribeToCell(report.position.cellId);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Fehler beim Melden';
      setError(msg);
      throw err;
    }
  }, []);

  return { aggregates, isLoading, addReport, error, syncStatus };
}
