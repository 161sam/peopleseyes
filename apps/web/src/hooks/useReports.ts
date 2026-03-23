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

  // Initialisierung
  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        await localReportStore.init();
        await p2pSync.init();

        if (!mounted) return;

        const localAggregates = await localReportStore.computeAllAggregates();
        setAggregates(localAggregates);
        setIsLoading(false);

        // P2P-Updates eingehend mergen
        // In Phase 2: Subscribe auf sichtbare Zellen (nach Map-Viewport)
        // Vorerst: alle eingehenden Updates akzeptieren
      } catch (err) {
        if (!mounted) return;
        console.error('Report-Store init fehlgeschlagen:', err);
        setIsLoading(false);
      }
    };

    void init();
    return () => { mounted = false; };
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
