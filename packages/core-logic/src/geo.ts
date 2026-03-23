import { latLngToCell, gridDisk, cellToBoundary, cellToLatLng } from 'h3-js';
import type { AnonymizedPosition, GeoBoundingBox, H3CellId } from '@peopleseyes/core-model';
import { H3Resolution } from '@peopleseyes/core-model';

/**
 * Rundet einen Unix-Timestamp (ms) auf die nächste volle Stunde ab.
 * Ziel: zeitliche Re-Identifikation erschweren.
 */
export function floorToHour(timestampMs: number): number {
  return Math.floor(timestampMs / 3_600_000) * 3_600_000;
}

/**
 * Rundet einen Unix-Timestamp (ms) auf die nächste volle Minute ab.
 */
export function floorToMinute(timestampMs: number): number {
  return Math.floor(timestampMs / 60_000) * 60_000;
}

/**
 * Konvertiert GPS-Koordinaten in eine H3-Zell-ID (h3-js).
 * Resolution 7 ≈ 5 km² – Standard für PeoplesEyes.
 */
export function latLngToCellId(
  lat: number,
  lng: number,
  resolution: H3Resolution = H3Resolution.Viertel,
): H3CellId {
  return latLngToCell(lat, lng, resolution);
}

/**
 * Erzeugt eine AnonymizedPosition aus rohen Koordinaten.
 * Rohe Koordinaten werden NICHT gespeichert oder weitergegeben.
 */
export function anonymizePosition(
  lat: number,
  lng: number,
  resolution: H3Resolution = H3Resolution.Viertel,
  nowMs: number = Date.now(),
): AnonymizedPosition {
  return {
    cellId: latLngToCellId(lat, lng, resolution),
    resolution,
    timestampHour: floorToHour(nowMs),
  };
}

/**
 * Gibt die Nachbar-Zell-IDs für einen gegebenen Radius zurück (h3-js gridDisk).
 */
export function getNeighborCells(cellId: H3CellId, radius: number = 1): H3CellId[] {
  return gridDisk(cellId, radius).filter(id => id !== cellId);
}

/**
 * Gibt die GeoJSON-Polygon-Koordinaten einer H3-Zelle zurück.
 * Für MapLibre-GL Rendering.
 */
export function getCellBoundary(cellId: H3CellId): Array<[number, number]> {
  // cellToBoundary liefert [lat, lng] – MapLibre braucht [lng, lat]
  return cellToBoundary(cellId).map(([lat, lng]) => [lng, lat]);
}

/**
 * Gibt den Mittelpunkt einer H3-Zelle zurück (für Map-Label-Positionierung).
 */
export function getCellCenter(cellId: H3CellId): { lat: number; lng: number } {
  const [lat, lng] = cellToLatLng(cellId);
  return { lat, lng };
}

/**
 * Prüft ob eine Zelle innerhalb einer Bounding-Box liegt.
 */
export function isCellInBoundingBox(cellId: H3CellId, bbox: GeoBoundingBox): boolean {
  const { lat, lng } = getCellCenter(cellId);
  return lat >= bbox.south && lat <= bbox.north && lng >= bbox.west && lng <= bbox.east;
}
