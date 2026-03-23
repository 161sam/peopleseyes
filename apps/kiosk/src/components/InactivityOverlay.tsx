import React, { useEffect, useState } from 'react';

interface InactivityOverlayProps {
  /** Sekunden bis Reset – wird als Countdown angezeigt */
  countdownSec: number;
  onDismiss: () => void;
}

/**
 * Overlay das kurz vor dem Inaktivitäts-Reset erscheint.
 * Gibt dem Nutzer 10 Sekunden um zu reagieren.
 */
const InactivityOverlay: React.FC<InactivityOverlayProps> = ({
  countdownSec,
  onDismiss,
}) => {
  const [remaining, setRemaining] = useState(countdownSec);

  useEffect(() => {
    if (remaining <= 0) return;
    const t = setTimeout(() => setRemaining(r => r - 1), 1000);
    return () => clearTimeout(t);
  }, [remaining]);

  const progress = remaining / countdownSec;
  const circumference = 2 * Math.PI * 40;
  const dashOffset = circumference * (1 - progress);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/95 backdrop-blur-sm"
      onClick={onDismiss}
      onTouchStart={onDismiss}
    >
      <div className="flex flex-col items-center gap-6 text-center px-8">
        {/* Kreisförmiger Countdown */}
        <div className="relative w-28 h-28">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle
              cx="50" cy="50" r="40"
              fill="none" stroke="#1e293b" strokeWidth="8"
            />
            <circle
              cx="50" cy="50" r="40"
              fill="none" stroke="#3b82f6" strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-3xl font-medium text-slate-100">
            {remaining}
          </span>
        </div>

        <div>
          <p className="text-xl font-medium text-slate-100 mb-2">
            Noch da?
          </p>
          <p className="text-sm text-slate-400">
            Bildschirm wird in {remaining} Sekunden zurückgesetzt.
          </p>
        </div>

        <button
          className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-base font-medium transition-colors"
          onClick={e => { e.stopPropagation(); onDismiss(); }}
        >
          Hier tippen zum Fortfahren
        </button>
      </div>
    </div>
  );
};

export default InactivityOverlay;
