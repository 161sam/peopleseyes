/**
 * PIN-Eingabe-Bildschirm für den verschlüsselten OPFS-Speicher.
 *
 * Sicherheitsentscheidungen:
 * - Numerischer Eingabe-Block statt Freitext-Input: verhindert Keyboard-Screenshots
 *   auf überwachten Geräten (Tastaturlayout nicht sichtbar).
 * - Kein Biometrie-Fallback, kein "PIN vergessen": bewusste Entscheidung.
 *   Das Threat Model schliesst erzwungene Entsperrung ein – eine technische
 *   Hintertür würde diesen Schutz zunichte machen.
 * - PIN bleibt niemals im DOM als Klartext sichtbar (nur Punkte angezeigt).
 * - Fehlerfall: Shake-Effekt + Fehlermeldung, PIN-Feld wird geleert.
 */

import React, { useState, useCallback, useEffect, useRef } from 'react';
import type { UseStoragePinReturn, PinState } from '../hooks/useStoragePin.js';

const MIN_PIN_LENGTH = 4;
const MAX_PIN_LENGTH = 8;

/** Ziffernblock-Layout: 3×4 Grid mit leerem Platzhalter links unten */
const KEYPAD_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', null, '0', '⌫'] as const;
type KeypadKey = (typeof KEYPAD_KEYS)[number];

interface PinLockScreenProps {
  pinState: PinState;
  pinError: string | null;
  onSubmitPin: UseStoragePinReturn['submitPin'];
}

const PinLockScreen: React.FC<PinLockScreenProps> = ({ pinState, pinError, onSubmitPin }) => {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const prevErrorRef = useRef<string | null>(null);

  const isSetup = pinState === 'setup';
  const activePin = isConfirming ? confirmPin : pin;

  // Shake-Effekt + PIN leeren bei neuem Fehler
  useEffect(() => {
    const err = pinError ?? localError;
    if (err && err !== prevErrorRef.current) {
      prevErrorRef.current = err;
      setIsShaking(true);
      setPin('');
      setConfirmPin('');
      setIsConfirming(false);
      const timer = setTimeout(() => setIsShaking(false), 600);
      return () => clearTimeout(timer);
    }
  }, [pinError, localError]);

  const handleKey = useCallback(
    (key: KeypadKey) => {
      if (isSubmitting || key === null) return;

      if (key === '⌫') {
        if (isConfirming) {
          setConfirmPin(p => p.slice(0, -1));
        } else {
          setPin(p => p.slice(0, -1));
        }
        return;
      }

      if (activePin.length >= MAX_PIN_LENGTH) return;

      if (isConfirming) {
        setConfirmPin(p => p + key);
      } else {
        setPin(p => p + key);
      }
    },
    [activePin.length, isConfirming, isSubmitting],
  );

  const handleSubmit = useCallback(async () => {
    if (isSubmitting) return;
    setLocalError(null);

    if (activePin.length < MIN_PIN_LENGTH) {
      setLocalError(`PIN muss mindestens ${MIN_PIN_LENGTH} Ziffern haben.`);
      return;
    }

    // Setup: erster Schritt → Bestätigung anfordern
    if (isSetup && !isConfirming) {
      setIsConfirming(true);
      return;
    }

    // Setup: zweiter Schritt → PINs vergleichen
    if (isSetup && isConfirming) {
      if (confirmPin !== pin) {
        setLocalError('PINs stimmen nicht überein. Bitte erneut versuchen.');
        return;
      }
    }

    setIsSubmitting(true);
    try {
      await onSubmitPin(isConfirming ? confirmPin : pin);
    } finally {
      setIsSubmitting(false);
    }
  }, [isSubmitting, activePin.length, isSetup, isConfirming, pin, confirmPin, onSubmitPin]);

  const displayedError = pinError ?? localError;

  const title = isSetup
    ? isConfirming
      ? 'PIN bestätigen'
      : 'Neuen PIN wählen'
    : 'PIN eingeben';

  const subtitle = isSetup
    ? isConfirming
      ? 'Bitte PIN zur Bestätigung noch einmal eingeben.'
      : `Wähle einen PIN (${MIN_PIN_LENGTH}–${MAX_PIN_LENGTH} Ziffern) zum Schützen deiner Daten.`
    : 'Deine Daten sind verschlüsselt. Gib den PIN ein um fortzufahren.';

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-slate-100 px-6">
      <div className="w-full max-w-xs flex flex-col items-center gap-6">

        {/* Titel + Untertitel */}
        <div className="text-center space-y-1">
          <div className="text-4xl mb-2" role="img" aria-label="Schloss">
            🔒
          </div>
          <h1 className="text-xl font-semibold">{title}</h1>
          <p className="text-sm text-slate-400">{subtitle}</p>
        </div>

        {/* PIN-Punkte */}
        <div
          className={`flex gap-3 transition-transform${isShaking ? ' animate-shake' : ''}`}
          role="status"
          aria-label={`PIN-Eingabe: ${activePin.length} von maximal ${MAX_PIN_LENGTH} Ziffern`}
          aria-live="polite"
        >
          {Array.from({ length: MAX_PIN_LENGTH }, (_, i) => (
            <div
              key={i}
              className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-150 ${
                i < activePin.length
                  ? 'bg-blue-400 border-blue-400 scale-110'
                  : 'border-slate-600 bg-transparent'
              }`}
            />
          ))}
        </div>

        {/* Fehlermeldung */}
        <div className="h-5" aria-live="assertive">
          {displayedError && (
            <p className="text-sm text-red-400 text-center">{displayedError}</p>
          )}
        </div>

        {/* Ziffernblock */}
        <div
          className="grid grid-cols-3 gap-3 w-full"
          role="group"
          aria-label="Ziffernblock"
        >
          {KEYPAD_KEYS.map((key, i) => {
            if (key === null) {
              return <div key={i} aria-hidden="true" />;
            }

            if (key === '⌫') {
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleKey(key)}
                  disabled={isSubmitting || activePin.length === 0}
                  className="flex items-center justify-center h-14 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 disabled:opacity-40 text-slate-300 text-xl transition-all select-none"
                  aria-label="Letzte Ziffer löschen"
                >
                  {key}
                </button>
              );
            }

            return (
              <button
                key={i}
                type="button"
                onClick={() => handleKey(key)}
                disabled={isSubmitting || activePin.length >= MAX_PIN_LENGTH}
                className="flex items-center justify-center h-14 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 disabled:opacity-40 text-white text-2xl font-medium transition-all select-none"
                aria-label={`Ziffer ${key}`}
              >
                {key}
              </button>
            );
          })}
        </div>

        {/* Bestätigungs-Button */}
        <button
          type="button"
          onClick={() => void handleSubmit()}
          disabled={isSubmitting || activePin.length < MIN_PIN_LENGTH}
          className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold transition-colors"
        >
          {isSubmitting
            ? 'Bitte warten…'
            : isSetup && !isConfirming
              ? 'Weiter'
              : 'Entsperren'}
        </button>

        {/* Sicherheitshinweis */}
        <p className="text-xs text-slate-600 text-center leading-relaxed">
          PeoplesEyes speichert keinen PIN und hat keine Entsperrungs-Hintertür.
          Bei vergessenem PIN gehen lokale Daten unwiederbringlich verloren.
        </p>
      </div>
    </div>
  );
};

export default PinLockScreen;
