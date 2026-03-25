import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CellAggregate } from '@peopleseyes/core-model';

const TIMELINE_HOURS = 24;
const ANIMATION_INTERVAL_MS = 800;

export interface TimelineState {
  hourOffset: number;
  isPlaying: boolean;
  setHourOffset: (offset: number) => void;
  togglePlay: () => void;
  filteredAggregates: CellAggregate[];
  selectedTimestamp: number;
}

function hourTimestamp(offsetHours: number): number {
  const now = Date.now();
  const floored = now - (now % (60 * 60 * 1000));
  return floored + offsetHours * 60 * 60 * 1000;
}

function filterByHour(aggregates: CellAggregate[], targetTimestamp: number): CellAggregate[] {
  const windowMs = 30 * 60 * 1000;
  return aggregates.filter(
    aggregate => Math.abs(aggregate.lastUpdatedHour - targetTimestamp) <= windowMs,
  );
}

export function useTimelineFilter(aggregates: CellAggregate[]): TimelineState {
  const [hourOffset, setHourOffset] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const animationRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isPlaying) {
      if (animationRef.current) {
        clearInterval(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    animationRef.current = setInterval(() => {
      setHourOffset(prev => {
        const next = prev + 1;
        return next > 0 ? -(TIMELINE_HOURS - 1) : next;
      });
    }, ANIMATION_INTERVAL_MS);

    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isPlaying]);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => {
      if (!prev) {
        setHourOffset(current => (current === 0 ? -(TIMELINE_HOURS - 1) : current));
      }
      return !prev;
    });
  }, []);

  const selectedTimestamp = hourTimestamp(hourOffset);

  const filteredAggregates = useMemo(() => {
    if (hourOffset === 0) return aggregates;
    return filterByHour(aggregates, selectedTimestamp);
  }, [aggregates, hourOffset, selectedTimestamp]);

  return {
    hourOffset,
    isPlaying,
    setHourOffset,
    togglePlay,
    filteredAggregates,
    selectedTimestamp,
  };
}
