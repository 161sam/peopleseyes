import React, { useState, useRef, useEffect } from 'react';
import type { Translations } from '@peopleseyes/core-i18n';
import {
  queryLegalAssistant,
  LEGAL_ASSISTANT_KEY_STORAGE,
} from '../services/legal-assistant.js';
import type { LegalAssistantMessage } from '../services/legal-assistant.js';

interface LegalChatProps {
  t: Translations;
  locale: string;
  activeRightsTopic?: string | undefined;
  onClose: () => void;
}

// ─── Ladeindikator (CSS-animiert) ─────────────────────────────────────────────

const LoadingDots: React.FC = () => (
  <span className="inline-flex gap-1 items-center">
    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0ms]" />
    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]" />
    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]" />
  </span>
);

// ─── Hauptkomponente ──────────────────────────────────────────────────────────

export const LegalChat: React.FC<LegalChatProps> = ({
  t,
  locale,
  activeRightsTopic,
  onClose,
}) => {
  const lc = t.legalChat;
  const [messages, setMessages] = useState<LegalAssistantMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const apiKey = typeof localStorage !== 'undefined'
    ? (localStorage.getItem(LEGAL_ASSISTANT_KEY_STORAGE) ?? '')
    : '';

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  function getErrorMessage(errCode: string): string {
    if (errCode === 'API_KEY_INVALID') return lc.errorInvalidKey;
    if (errCode === 'RATE_LIMIT') return lc.errorRateLimit;
    return lc.errorNetwork;
  }

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || isLoading || !apiKey) return;

    const userMsg: LegalAssistantMessage = { role: 'user', content: trimmed };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setError(null);
    setIsLoading(true);

    try {
      const reply = await queryLegalAssistant(updated, {
        apiKey,
        locale,
        activeRightsTopic,
      });
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      const code = err instanceof Error ? err.message : 'NETWORK_ERROR';
      setError(getErrorMessage(code));
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 rounded-t-2xl flex flex-col"
           style={{ height: '65vh', maxWidth: '640px', margin: '0 auto' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 flex-shrink-0">
          <span className="text-sm font-medium text-slate-200">{lc.title}</span>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 text-lg transition-colors leading-none"
          >
            ✕
          </button>
        </div>

        {/* Disclaimer */}
        <div className="px-4 py-2 bg-amber-900/20 border-b border-amber-800/30 flex-shrink-0">
          <p className="text-xs text-amber-400/80">{lc.disclaimer}</p>
        </div>

        {/* Kein API-Key */}
        {!apiKey ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-2 px-6 text-center">
            <span className="text-3xl">🔑</span>
            <p className="text-sm text-slate-400">{lc.noKey}</p>
            <p className="text-xs text-slate-600">{lc.noKeyHint}</p>
          </div>
        ) : (
          <>
            {/* Chat-History */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-800 text-slate-200'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 px-3 py-2 rounded-xl">
                    <LoadingDots />
                  </div>
                </div>
              )}
              {error && (
                <div className="text-xs text-red-400 text-center py-1">{error}</div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="flex gap-2 px-4 py-3 border-t border-slate-800 flex-shrink-0 pb-safe">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={lc.placeholder}
                disabled={isLoading}
                className="flex-1 bg-slate-800 text-slate-200 placeholder-slate-600 rounded-xl px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
              />
              <button
                onClick={() => void handleSend()}
                disabled={!input.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl px-4 py-2 text-sm font-medium transition-colors"
              >
                →
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default LegalChat;
