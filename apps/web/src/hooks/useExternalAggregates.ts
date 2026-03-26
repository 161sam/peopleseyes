import { useState, useEffect, useCallback, useRef } from 'react';
import type { CellAggregate } from '@peopleseyes/core-model';
import {
  loadAllEnabledFeeds,
  DEFAULT_EXTERNAL_FEEDS,
} from '../services/external-feed.js';
import type { FeedConfig } from '../services/external-feed.js';

const LS_ENABLED_KEY = 'pe:external-layer-enabled';
const LS_CONFIGS_KEY = 'pe:external-feed-configs';
const AUTO_REFRESH_MS = 5 * 60 * 1000; // 5 minutes

export interface ExternalLayerState {
  aggregates: CellAggregate[];
  isLoading: boolean;
  isEnabled: boolean;
  feedConfigs: FeedConfig[];
  toggleEnabled(): void;
  toggleFeed(url: string): void;
  refresh(): void;
}

function loadStoredConfigs(): FeedConfig[] {
  try {
    const raw = localStorage.getItem(LS_CONFIGS_KEY);
    if (raw === null) return DEFAULT_EXTERNAL_FEEDS;
    const stored = JSON.parse(raw) as Partial<FeedConfig>[];
    // Merge stored enabled states onto DEFAULT_EXTERNAL_FEEDS
    return DEFAULT_EXTERNAL_FEEDS.map(def => {
      const override = stored.find(s => s.url === def.url);
      return override !== undefined && typeof override.enabled === 'boolean'
        ? { ...def, enabled: override.enabled }
        : def;
    });
  } catch {
    return DEFAULT_EXTERNAL_FEEDS;
  }
}

function saveConfigs(configs: FeedConfig[]): void {
  try {
    localStorage.setItem(LS_CONFIGS_KEY, JSON.stringify(configs));
  } catch {
    // storage full — ignore
  }
}

export function useExternalAggregates(): ExternalLayerState {
  const [isEnabled, setIsEnabled] = useState<boolean>(() => {
    try { return localStorage.getItem(LS_ENABLED_KEY) === 'true'; }
    catch { return false; }
  });

  const [feedConfigs, setFeedConfigs] = useState<FeedConfig[]>(loadStoredConfigs);
  const [aggregates, setAggregates] = useState<CellAggregate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const doLoad = useCallback(async (configs: FeedConfig[]) => {
    setIsLoading(true);
    try {
      const result = await loadAllEnabledFeeds(configs);
      setAggregates(result);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Start/stop auto-refresh based on isEnabled
  useEffect(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!isEnabled) {
      setAggregates([]);
      return;
    }

    // Initial load
    void doLoad(feedConfigs);

    // Auto-refresh every 5 minutes
    intervalRef.current = setInterval(() => {
      void doLoad(feedConfigs);
    }, AUTO_REFRESH_MS);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isEnabled, doLoad]); // feedConfigs intentionally omitted — use ref for interval

  const toggleEnabled = useCallback(() => {
    setIsEnabled(prev => {
      const next = !prev;
      try { localStorage.setItem(LS_ENABLED_KEY, String(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const toggleFeed = useCallback((url: string) => {
    setFeedConfigs(prev => {
      const updated = prev.map(c =>
        c.url === url ? { ...c, enabled: !c.enabled } : c,
      );
      saveConfigs(updated);
      if (isEnabled) {
        void doLoad(updated);
      }
      return updated;
    });
  }, [isEnabled, doLoad]);

  const refresh = useCallback(() => {
    if (isEnabled) {
      void doLoad(feedConfigs);
    }
  }, [isEnabled, feedConfigs, doLoad]);

  return { aggregates, isLoading, isEnabled, feedConfigs, toggleEnabled, toggleFeed, refresh };
}
