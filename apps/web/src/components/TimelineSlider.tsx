import React, { useCallback } from 'react';
import type { TimelineState } from '../hooks/useTimelineFilter.js';

const TIMELINE_HOURS = 24;

function formatHour(timestamp: number): string {
  return new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date(timestamp));
}

function formatDateTime(timestamp: number): string {
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date(timestamp));
}

interface TimelineSliderProps {
  timeline: TimelineState;
  labels?: {
    play: string;
    pause: string;
    now: string;
    hoursAgo: (n: number) => string;
  };
}

const DEFAULT_LABELS = {
  play: 'Zeitstrahl abspielen',
  pause: 'Pause',
  now: 'Jetzt',
  hoursAgo: (n: number) => `vor ${n}h`,
};

export const TimelineSlider: React.FC<TimelineSliderProps> = ({
  timeline,
  labels = DEFAULT_LABELS,
}) => {
  const { hourOffset, isPlaying, setHourOffset, togglePlay, selectedTimestamp } = timeline;

  const handleSliderChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const sliderValue = parseInt(event.currentTarget.value, 10);
      setHourOffset(sliderValue - (TIMELINE_HOURS - 1));
    },
    [setHourOffset],
  );

  const sliderValue = hourOffset + (TIMELINE_HOURS - 1);
  const isNow = hourOffset === 0;

  return (
    <div
      className="
        absolute bottom-20 left-0 right-0 mx-4 md:mx-auto md:max-w-lg
        bg-slate-900/90 backdrop-blur-sm text-white
        rounded-xl shadow-2xl p-3 z-20
        border border-slate-700/50
      "
      role="group"
      aria-label="Zeitstrahl"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 min-w-0">
          {isNow ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {labels.now}
            </span>
          ) : (
            <span className="text-sm text-slate-300 truncate">
              {formatDateTime(selectedTimestamp)}
              <span className="ml-2 text-xs text-slate-500">
                ({labels.hoursAgo(Math.abs(hourOffset))})
              </span>
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={togglePlay}
          className="
            flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium
            bg-slate-700 hover:bg-slate-600 transition-colors shrink-0
          "
          aria-label={isPlaying ? labels.pause : labels.play}
          aria-pressed={isPlaying}
        >
          {isPlaying ? (
            <>
              <PauseIcon />
              {labels.pause}
            </>
          ) : (
            <>
              <PlayIcon />
              {labels.play}
            </>
          )}
        </button>
      </div>

      <div className="relative">
        <input
          type="range"
          min={0}
          max={TIMELINE_HOURS - 1}
          step={1}
          value={sliderValue}
          onChange={handleSliderChange}
          className="w-full h-2 appearance-none rounded-full cursor-pointer accent-blue-500 bg-slate-700"
          aria-label="Zeitpunkt auswählen"
          aria-valuetext={isNow ? labels.now : formatDateTime(selectedTimestamp)}
        />

        <div className="flex justify-between mt-1 px-0.5">
          <span className="text-xs text-slate-500">
            {formatHour(Date.now() - 23 * 60 * 60 * 1000)}
          </span>
          <span className="text-xs text-slate-500">
            {formatHour(Date.now() - 12 * 60 * 60 * 1000)}
          </span>
          <span className="text-xs text-emerald-500 font-medium">
            {formatHour(Date.now())}
          </span>
        </div>
      </div>
    </div>
  );
};

const PlayIcon: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
    <path d="M2.5 1.5l7 4.5-7 4.5V1.5z" />
  </svg>
);

const PauseIcon: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
    <rect x="2" y="1.5" width="3" height="9" rx="0.5" />
    <rect x="7" y="1.5" width="3" height="9" rx="0.5" />
  </svg>
);
