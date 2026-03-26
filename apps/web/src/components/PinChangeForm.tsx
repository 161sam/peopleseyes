/**
 * PIN-Änderungsformular (3-Schritt, inline, kein Modal).
 *
 * Schritt 1 – Aktuellen PIN eingeben und validieren (ersten Report entschlüsseln).
 * Schritt 2 – Neuen PIN eingeben (4–8 Ziffern).
 * Schritt 3 – Neuen PIN bestätigen → Re-Encryption → Context aktualisieren.
 *
 * Gleiche Keypad-Komponente wie PinLockScreen, kein Freitext-Input.
 */

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { deriveStorageKey, loadSaltFromOpfs, changeStoragePin } from '../services/storage-key.js';
import type { Translations } from '@peopleseyes/core-i18n';

const MIN_PIN_LENGTH = 4;
const MAX_PIN_LENGTH = 8;

const KEYPAD_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', null, '0', '⌫'] as const;
type KeypadKey = (typeof KEYPAD_KEYS)[number];

interface PinChangeFormProps {
  currentKey: CryptoKey;
  onSuccess: (newKey: CryptoKey) => void;
  onCancel: () => void;
  t: Translations;
}

type ChangeStep = 1 | 2 | 3;

const PinChangeForm: React.FC<PinChangeFormProps> = ({ currentKey, onSuccess, onCancel, t }) => {
  const [step, setStep] = useState<ChangeStep>(1);
  const [pin, setPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [isWorking, setIsWorking] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const newKeyRef = useRef<CryptoKey | null>(null);
  const prevErrorRef = useRef<string | null>(null);

  const activePin = step === 1 ? pin : step === 2 ? newPin : confirmPin;

  // Shake-Effekt + Eingabe leeren bei neuem Fehler
  useEffect(() => {
    if (error && error !== prevErrorRef.current) {
      prevErrorRef.current = error;
      setIsShaking(true);
      setPin('');
      setNewPin('');
      setConfirmPin('');
      const timer = setTimeout(() => setIsShaking(false), 600);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Erfolg: nach 2s zurück zu Settings
  useEffect(() => {
    if (isDone && newKeyRef.current) {
      const timer = setTimeout(() => {
        onSuccess(newKeyRef.current!);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isDone, onSuccess]);

  const handleKey = useCallback(
    (key: KeypadKey) => {
      if (isWorking || isDone || key === null) return;

      if (key === '⌫') {
        if (step === 1) setPin(p => p.slice(0, -1));
        else if (step === 2) setNewPin(p => p.slice(0, -1));
        else setConfirmPin(p => p.slice(0, -1));
        return;
      }

      if (activePin.length >= MAX_PIN_LENGTH) return;

      if (step === 1) setPin(p => p + key);
      else if (step === 2) setNewPin(p => p + key);
      else setConfirmPin(p => p + key);
    },
    [activePin.length, isWorking, isDone, step],
  );

  const handleSubmit = useCallback(async () => {
    if (isWorking || isDone) return;
    setError(null);

    if (activePin.length < MIN_PIN_LENGTH) return;

    if (step === 1) {
      // Aktuellen PIN validieren: neuen Schlüssel ableiten + gegen currentKey testen
      setIsWorking(true);
      try {
        const salt = await loadSaltFromOpfs();
        if (!salt) {
          setError(t.settings.pinChangeError);
          return;
        }
        // Ableiten und gegen currentKey validieren indem wir einen Testblock entschlüsseln.
        // Wir prüfen indirekt: Wenn der abgeleitete Key denselben Salt nutzt wie der aktuelle,
        // und der PIN korrekt ist, ergibt sich ein funktional äquivalenter Key.
        // Einfachster Ansatz: neuen Key ableiten und prüfen ob er eine Verschlüsselung
        // des aktuellen Keys (bekannter Plaintext) entschlüsseln kann.
        // Praktischste Lösung: Einen bekannten Wert mit currentKey verschlüsseln,
        // dann mit abgeleitetem Key entschlüsseln.
        const probe = new TextEncoder().encode('pe:probe');
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const encrypted = await crypto.subtle.encrypt(
          { name: 'AES-GCM', iv },
          currentKey,
          probe,
        );
        const derivedKey = await deriveStorageKey(pin, salt);
        try {
          await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, derivedKey, encrypted);
          // Entschlüsselung erfolgreich → PIN ist korrekt
          setStep(2);
        } catch {
          setError(t.settings.pinChangeError);
        }
      } catch {
        setError(t.settings.pinChangeError);
      } finally {
        setIsWorking(false);
      }
      return;
    }

    if (step === 2) {
      setStep(3);
      return;
    }

    if (step === 3) {
      if (confirmPin !== newPin) {
        setError(t.settings.pinChangeMismatch);
        setStep(2);
        return;
      }

      setIsWorking(true);
      try {
        const newKey = await changeStoragePin(currentKey, newPin);
        newKeyRef.current = newKey;
        setIsDone(true);
      } catch {
        setError('Re-Encryption fehlgeschlagen. Bitte erneut versuchen.');
      } finally {
        setIsWorking(false);
      }
    }
  }, [isWorking, isDone, activePin.length, step, pin, newPin, confirmPin, currentKey, t]);

  const stepLabel = step === 1
    ? t.settings.pinChangeStep1
    : step === 2
    ? t.settings.pinChangeStep2
    : t.settings.pinChangeStep3;

  if (isDone) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center text-2xl">
          ✓
        </div>
        <p className="text-sm font-medium text-green-400">{t.settings.pinChangeSuccess}</p>
      </div>
    );
  }

  if (isWorking && step === 3) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-slate-400">{t.settings.pinChangeWorking}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-xs mx-auto py-4">
      {/* Fortschrittsanzeige */}
      <div className="flex gap-1.5 justify-center w-full">
        {([1, 2, 3] as const).map(s => (
          <div
            key={s}
            className={`h-1 rounded-full flex-1 transition-all duration-300 ${
              s < step ? 'bg-blue-500' : s === step ? 'bg-blue-400' : 'bg-slate-700'
            }`}
          />
        ))}
      </div>

      {/* Schritt-Label */}
      <div className="text-center">
        <p className="text-xs text-slate-500 mb-0.5">
          {t.settings.pinChangeStep1.replace('Aktuellen', '').replace('Enter', '')
            .trim().length > 0
            ? `Schritt ${step} von 3`
            : `Step ${step} of 3`}
        </p>
        <p className="text-sm font-medium text-slate-200">{stepLabel}</p>
      </div>

      {/* PIN-Punkte */}
      <div
        className={`flex gap-3 transition-transform${isShaking ? ' animate-shake' : ''}`}
        role="status"
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
        {error && <p className="text-sm text-red-400 text-center">{error}</p>}
      </div>

      {/* Ziffernblock */}
      <div className="grid grid-cols-3 gap-3 w-full" role="group" aria-label="Ziffernblock">
        {KEYPAD_KEYS.map((key, i) => {
          if (key === null) return <div key={i} aria-hidden="true" />;

          if (key === '⌫') {
            return (
              <button
                key={i}
                type="button"
                onClick={() => handleKey(key)}
                disabled={isWorking || activePin.length === 0}
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
              disabled={isWorking || activePin.length >= MAX_PIN_LENGTH}
              className="flex items-center justify-center h-14 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 disabled:opacity-40 text-white text-2xl font-medium transition-all select-none"
              aria-label={`Ziffer ${key}`}
            >
              {key}
            </button>
          );
        })}
      </div>

      {/* Bestätigen-Button */}
      <button
        type="button"
        onClick={() => void handleSubmit()}
        disabled={isWorking || activePin.length < MIN_PIN_LENGTH}
        className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold transition-colors"
      >
        {isWorking ? t.common.loading : t.common.next}
      </button>

      {/* Abbrechen */}
      <button
        type="button"
        onClick={onCancel}
        disabled={isWorking}
        className="text-sm text-slate-500 hover:text-slate-400 transition-colors disabled:opacity-40"
      >
        {t.common.cancel}
      </button>
    </div>
  );
};

export default PinChangeForm;
