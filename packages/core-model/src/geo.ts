/**
 * Geo-Anonymisierungs-Modell.
 *
 * Rohe GPS-Koordinaten werden NIEMALS zwischen Clients geteilt.
 * Jede Position wird in eine H3-Zelle (Resolution 7 ≈ 5 km²)
 * umgewandelt, bevor sie das Gerät verlässt.
 */

/** H3-Zell-ID als opaker String (z.B. "871fb4670ffffff") */
export type H3CellId = string;

/** Auflösungs-Level der H3-Zelle */
export enum H3Resolution {
  /** ~86 km² – Stadtgebiet-Level, sehr grob */
  Stadt = 6,
  /** ~5 km² – Stadtviertel-Level, Standard */
  Viertel = 7,
  /** ~0.7 km² – Straßenzug-Level, maximal präzise für PeoplesEyes */
  Strassenzug = 8,
}

/** Geografische Bounding-Box für Map-Abfragen */
export interface GeoBoundingBox {
  readonly north: number;
  readonly south: number;
  readonly east: number;
  readonly west: number;
}

/**
 * Anonymisierte Positions-Referenz.
 * Enthält ausschließlich Zelldaten – keine Rohdaten.
 */
export interface AnonymizedPosition {
  readonly cellId: H3CellId;
  readonly resolution: H3Resolution;
  /**
   * Timestamp auf Stundengenauigkeit gerundet,
   * um zeitliche Re-Identifikation zu erschweren.
   */
  readonly timestampHour: number;
}
