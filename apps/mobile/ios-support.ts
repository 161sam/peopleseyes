/**
 * iOS-spezifische Ergänzungen zum Kamera-Service.
 *
 * iOS unterscheidet sich von Android in:
 * - Photo Library Permission (separates Recht von Kamera)
 * - AVFoundation Audio-Session Management
 * - Kein Background-Recording ohne explizite Erlaubnis
 * - HEIC-Format (wird zu JPEG konvertiert)
 */

import { Platform } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as ImageManipulator from 'expo-image-manipulator';

/** Gibt true zurück wenn die aktuelle Plattform iOS ist */
export const IS_IOS = Platform.OS === 'ios';

/**
 * Fragt auf iOS die Photo-Library-Berechtigung an.
 * Auf Android nicht benötigt (Kamera-Berechtigung reicht).
 * 
 * Gibt true zurück wenn Berechtigung erteilt.
 */
export async function requestPhotoLibraryPermission(): Promise<boolean> {
  if (!IS_IOS) return true; // Auf Android nicht nötig

  const { status } = await MediaLibrary.requestPermissionsAsync();
  return status === 'granted';
}

/**
 * Konvertiert HEIC-Bilder (iOS Standard-Format) zu JPEG.
 * HEIC enthält oft weniger EXIF als JPEG – trotzdem immer durch
 * den EXIF-Strip-Prozess schicken.
 *
 * @param uri  - Bild-URI (kann HEIC oder JPEG sein)
 */
export async function normalizeImageFormat(uri: string): Promise<string> {
  if (!IS_IOS) return uri; // Android liefert bereits JPEG

  // HEIC → JPEG via Re-Encoding
  const result = await ImageManipulator.manipulateAsync(
    uri,
    [],
    { format: ImageManipulator.SaveFormat.JPEG, compress: 0.85 },
  );
  return result.uri;
}

/**
 * iOS-spezifische Hinweistexte für Permission-Dialoge.
 * Diese Texte erscheinen im System-Dialog – müssen klar und
 * vertrauenswürdig formuliert sein.
 */
export const IOS_PERMISSION_MESSAGES = {
  camera:
    'PeoplesEyes benötigt die Kamera um Beweisfotos und -videos aufzunehmen. ' +
    'Aufnahmen werden ausschließlich lokal auf deinem Gerät gespeichert.',
  microphone:
    'PeoplesEyes benötigt das Mikrofon um Audio-Beweise aufzunehmen. ' +
    'Aufnahmen werden ausschließlich lokal gespeichert.',
  location:
    'PeoplesEyes nutzt deinen Standort nur zur anonymisierten Meldung. ' +
    'Deine genauen GPS-Koordinaten werden nie gespeichert oder übertragen.',
  photoLibrary:
    'PeoplesEyes benötigt Zugriff auf die Fotos-App um Beweismaterial zu sichern. ' +
    'Es werden nur Dateien gespeichert, nie gelesen.',
} as const;

/**
 * iOS App Store Submission Checklist (Dokumentation).
 *
 * Muss vor dem ersten TestFlight/App-Store-Upload geprüft werden:
 *
 * Privacy Manifest (PrivacyInfo.xcprivacy):
 * - NSPrivacyAccessedAPITypes: [UserDefaults, FileTimestamp]
 * - NSPrivacyCollectedDataTypes: [] (keine Daten gesammelt)
 * - NSPrivacyTrackingDomains: [] (kein Tracking)
 * - NSPrivacyTracking: false
 *
 * Info.plist Permissions (in app.json ios.infoPlist):
 * - NSCameraUsageDescription ✅ (in app.json vorhanden)
 * - NSMicrophoneUsageDescription ✅ (in app.json vorhanden)
 * - NSLocationWhenInUseUsageDescription ✅ (in app.json vorhanden)
 * - NSPhotoLibraryUsageDescription ✅ (in app.json vorhanden)
 *
 * App Store Connect:
 * - Privacy Nutrition Label: "Data Not Collected" (korrekt für PeoplesEyes)
 * - Age Rating: 4+ (keine anstößigen Inhalte)
 * - Export Compliance: Encryption = Ja (ECDSA + HTTPS), EAR99 Exemption
 * - Review Notes: App-Zweck kurz erklären, Demo-Video empfohlen
 */
export const IOS_APP_STORE_NOTES = `
PeoplesEyes ist ein zivilgesellschaftliches Dokumentationswerkzeug.
Alle Daten bleiben lokal auf dem Gerät. Es gibt keine Nutzerkonten,
keine Analytics und keine externe Datenübertragung außer optionalem
P2P-Sync von anonymisierten, aggregierten Standort-Zellen.
` as const;
