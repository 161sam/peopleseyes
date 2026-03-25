import { useState, useEffect, useCallback } from 'react';
import type { CellAggregate, Report } from '@peopleseyes/core-model';
import { localReportStore } from '../services/local-report-store.js';
import { p2pSync } from '../services/p2p-sync.js';

interface UseReportsReturn {
  aggregates: CellAggregate[];
  isLoading: boolean;
  addReport: (report: Report) => Promise<void>;
  error: string | null;
}

export function useReports(): UseReportsReturn {
  const [aggregates, setAggregates] = useState<CellAggregate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialisierung + P2P-Callback verdrahten
  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        await localReportStore.init();
        await p2pSync.init();

        if (!mounted) return;

        const localAggregates = await localReportStore.computeAllAggregates();
        if (mounted) {
          setAggregates(localAggregates);
          setIsLoading(false);
        }
      } catch (err) {
        if (!mounted) return;
        console.error('Report-Store init fehlgeschlagen:', err);
        setIsLoading(false);
        setError('Lokaler Speicher konnte nicht geöffnet werden.');
      }
    };

    void init();

    // BUG-02 fix: eingehende P2P-Aggregate in den lokalen State mergen.
    // validateCellAggregate() in p2p-sync stellt sicher, dass nur valide
    // Daten diesen Callback erreichen.
    const unsubscribeP2P = p2pSync.onCellUpdate((incoming) => {
      if (!mounted) return;
      setAggregates(prev => {
        const idx = prev.findIndex(a => a.cellId === incoming.cellId);
        if (idx === -1) return [...prev, incoming];
        const updated = [...prev];
        updated[idx] = incoming;
        return updated;
      });
    });

    return () => {
      mounted = false;
      unsubscribeP2P();
    };
  }, []);

  const addReport = useCallback(async (report: Report) => {
    setError(null);
    try {
      await localReportStore.addReport(report);
      const updated = await localReportStore.computeAllAggregates();
      setAggregates(updated);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unbekannter Fehler';
      setError(msg);
      throw err;
    }
  }, []);

  return { aggregates, isLoading, addReport, error };
}
