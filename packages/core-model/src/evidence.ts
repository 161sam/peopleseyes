/**
 * Lokale Beweissicherung.
 *
 * Beweise verlassen das Gerät NICHT automatisch.
 * EXIF-Daten werden vor dem Speichern entfernt.
 */

export type MediaType = 'video' | 'audio' | 'photo';

export interface Evidence {
  /** Lokale UUID, nie mit Server geteilt */
  readonly id: string;
  readonly mediaType: MediaType;
  /**
   * Unix-Timestamp auf Minutengenauigkeit.
   * Kein exakter Zeitstempel wegen Re-Identifikations-Risiko.
   */
  readonly capturedAtMinute: number;
  /**
   * Optionale Notiz des Nutzers (max. 500 Zeichen).
   * Nutzer werden auf Risiko persönlicher Infos hingewiesen.
   */
  readonly notes?: string;
  /**
   * Blob-URL oder IndexedDB-Key.
   * Niemals ein externer URL oder Server-Pfad.
   */
  readonly localRef: string;
  /** Dateigröße in Bytes – für Storage-Management */
  readonly sizeBytes: number;
  /** EXIF wurden entfernt – muss vor dem Speichern true sein */
  readonly exifStripped: boolean;
}
