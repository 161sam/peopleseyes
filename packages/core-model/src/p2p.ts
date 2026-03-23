/**
 * P2P-Netzwerk-Typen.
 *
 * PeoplesEyes verwendet ein dezentrales Peer-to-Peer-Modell.
 * Es gibt keinen zentralen Server der Nutzer identifiziert.
 */

/**
 * Ephemere Peer-ID – wird bei jedem App-Start neu generiert.
 * Keine persistente Nutzer-Identität.
 */
export type EphemeralPeerId = string;

/**
 * Nachrichtentypen im P2P-Protokoll.
 * Alle Nachrichten sind anonym – keine Absender-Identität.
 */
export type P2PMessageType =
  | 'report:new'       // Neue Sichtungsmeldung
  | 'report:confirm'   // Bestätigung einer bestehenden Meldung
  | 'report:flag'      // Verdacht auf Fehler-/Spam-Meldung
  | 'sync:request'     // Anfrage nach Zell-Aggregaten
  | 'sync:response';   // Antwort mit aggregierten Zell-Daten

export interface P2PMessage<T = unknown> {
  readonly type: P2PMessageType;
  readonly payload: T;
  /**
   * Nachrichts-ID für Deduplizierung.
   * UUID v4, generiert pro Nachricht.
   */
  readonly msgId: string;
  /** Unix-Timestamp in Millisekunden */
  readonly sentAt: number;
}
