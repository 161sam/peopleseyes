/**
 * Kamera-Service für React Native.
 *
 * Nutzt expo-camera für Aufnahmen und expo-image-manipulator
 * für EXIF-Stripping. Alle Beweise bleiben lokal im App-Sandbox.
 *
 * EXIF-Strip-Strategie:
 * - Bilder: expo-image-manipulator re-kodiert das Bild → EXIF-Daten entfallen
 * - Videos: expo-av direkt, EXIF nicht relevant bei Video-Containern
 * - Audio:  expo-av direkt
 */

import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';
import type { Evidence } from '@peopleseyes/core-model';
import { floorToMinute } from '@peopleseyes/core-logic';

export type CaptureMediaType = 'photo' | 'video' | 'audio';

export interface CaptureResult {
  evidence: Omit<Evidence, 'id'>;
  /** Temporärer Pfad der Aufnahme im App-Sandbox */
  localUri: string;
}

function randomId(): string {
  const c = globalThis as { crypto?: { randomUUID?: () => string } };
  if (c.crypto?.randomUUID) return c.crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Entfernt EXIF-Daten aus einem Foto via Re-Kodierung.
 *
 * expo-image-manipulator liest das Pixel-Bild, rendert es neu
 * und schreibt es als neues JPEG/PNG – dabei werden alle
 * Metadaten (GPS, Kameramodell, Zeitstempel) verworfen.
 *
 * @param sourceUri  - Uri des Original-Fotos
 * @param quality    - JPEG-Qualität 0–1 (Standard: 0.82)
 */
export async function stripExifNative(
  sourceUri: string,
  quality: number = 0.82,
): Promise<{ uri: string; exifStripped: true; sizeBytes: number }> {
  const result = await ImageManipulator.manipulateAsync(
    sourceUri,
    [], // Keine Transformationen – nur Re-Kodierung
    {
      compress: quality,
      format: ImageManipulator.SaveFormat.JPEG,
      // exif: false ist in expo-image-manipulator implizit beim Re-Encode
    },
  );

  // Dateigröße ermitteln
  const info = await FileSystem.getInfoAsync(result.uri, { size: true });
  const sizeBytes = info.exists ? (info.size ?? 0) : 0;

  return { uri: result.uri, exifStripped: true, sizeBytes };
}

/**
 * Verschiebt eine temporäre Aufnahme in den permanenten App-Speicher.
 * Dateiname enthält nur einen zufälligen UUID-Teil, keinen Timestamp.
 */
export async function moveToAppStorage(
  tempUri: string,
  mediaType: CaptureMediaType,
): Promise<string> {
  const ext = mediaType === 'photo' ? 'jpg' : mediaType === 'video' ? 'mp4' : 'm4a';
  const fileName = `${randomId()}.${ext}`;
  const destDir = `${FileSystem.documentDirectory}evidence/`;
  const destUri = `${destDir}${fileName}`;

  // Ziel-Verzeichnis anlegen
  const dirInfo = await FileSystem.getInfoAsync(destDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(destDir, { intermediates: true });
  }

  await FileSystem.moveAsync({ from: tempUri, to: destUri });
  return destUri;
}

/**
 * Verarbeitet ein aufgenommenes Foto:
 * 1. EXIF strippen
 * 2. In permanenten Speicher verschieben
 * 3. Evidence-Objekt erzeugen
 */
export async function processPhoto(
  tempUri: string,
): Promise<CaptureResult> {
  const { uri: strippedUri, sizeBytes } = await stripExifNative(tempUri);
  const finalUri = await moveToAppStorage(strippedUri, 'photo');

  return {
    evidence: {
      mediaType: 'photo',
      capturedAtMinute: floorToMinute(Date.now()),
      localRef: finalUri,
      sizeBytes,
      exifStripped: true,
    },
    localUri: finalUri,
  };
}

/**
 * Verarbeitet eine aufgenommene Audio-/Video-Datei.
 * Kein EXIF-Strip nötig – Video/Audio-Container enthalten
 * keine GPS-Metadaten in expo-av-Aufnahmen.
 */
export async function processMediaFile(
  tempUri: string,
  mediaType: 'video' | 'audio',
): Promise<CaptureResult> {
  const finalUri = await moveToAppStorage(tempUri, mediaType);
  const info = await FileSystem.getInfoAsync(finalUri, { size: true });

  return {
    evidence: {
      mediaType,
      capturedAtMinute: floorToMinute(Date.now()),
      localRef: finalUri,
      sizeBytes: info.exists ? (info.size ?? 0) : 0,
      exifStripped: true, // expo-av schreibt keine EXIF in Audio/Video
    },
    localUri: finalUri,
  };
}

/**
 * Löscht eine lokale Evidenz-Datei aus dem App-Speicher.
 */
export async function deleteEvidenceFile(localRef: string): Promise<void> {
  const info = await FileSystem.getInfoAsync(localRef);
  if (info.exists) {
    await FileSystem.deleteAsync(localRef, { idempotent: true });
  }
}

/**
 * Gibt den gesamten genutzten Speicher der Evidence-Dateien zurück (Bytes).
 */
export async function getEvidenceStorageUsed(): Promise<number> {
  const dir = `${FileSystem.documentDirectory}evidence/`;
  const info = await FileSystem.getInfoAsync(dir, { size: true });
  if (!info.exists) return 0;

  const files = await FileSystem.readDirectoryAsync(dir);
  let total = 0;
  for (const file of files) {
    const fInfo = await FileSystem.getInfoAsync(`${dir}${file}`, { size: true });
    if (fInfo.exists) total += fInfo.size ?? 0;
  }
  return total;
}

/** Gibt einen lesbaren String für eine Speichergröße zurück */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Platform-Hinweis: iOS-spezifische Einschränkungen */
export const IS_IOS = Platform.OS === 'ios';
