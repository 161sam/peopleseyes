/**
 * EXIF-Stripping für Fotos.
 *
 * Entfernt alle EXIF-Metadaten (GPS, Gerät, Zeitstempel) aus JPEG/PNG-Blobs
 * durch Canvas-Reprojection. Das Bild wird über ein Canvas neu gerendert –
 * dabei gehen alle Metadaten verloren.
 *
 * Einschränkung: Funktioniert nur im Browser (Canvas API erforderlich).
 * Für React Native: eigenes native Module verwenden.
 */

export interface StrippedMedia {
  readonly blob: Blob;
  readonly exifStripped: true;
  readonly originalSizeBytes: number;
  readonly strippedSizeBytes: number;
}

/**
 * Entfernt EXIF-Daten aus einem Bild-Blob via Canvas-Reprojection.
 *
 * @param imageBlob - Originales Foto (JPEG oder PNG)
 * @param quality   - JPEG-Qualität 0–1 (Standard: 0.85)
 */
export async function stripExifFromImage(
  imageBlob: Blob,
  quality: number = 0.85,
): Promise<StrippedMedia> {
  const originalSizeBytes = imageBlob.size;

  const bitmap = await createImageBitmap(imageBlob);
  const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error('Canvas context nicht verfügbar');

  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();

  const outputType = imageBlob.type === 'image/png' ? 'image/png' : 'image/jpeg';
  const strippedBlob = await canvas.convertToBlob({ type: outputType, quality });

  return {
    blob: strippedBlob,
    exifStripped: true,
    originalSizeBytes,
    strippedSizeBytes: strippedBlob.size,
  };
}

/**
 * Gibt zurück ob ein Blob ein unterstütztes Bildformat ist.
 */
export function isSupportedImageType(blob: Blob): boolean {
  return ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(blob.type);
}
