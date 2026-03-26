import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  onDone: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onDone }) => {
  useEffect(() => {
    const timer = setTimeout(onDone, 3000);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 shadow-lg animate-fade-in flex items-center gap-2 max-w-xs"
    >
      <span className="text-green-400" aria-hidden="true">✓</span>
      {message}
    </div>
  );
};

export default Toast;
