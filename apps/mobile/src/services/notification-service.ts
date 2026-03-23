/**
 * Notification-Service für PeoplesEyes Mobile.
 *
 * Benachrichtigungen werden LOKAL ausgelöst, nie von einem Server gepusht.
 * Kein FCM, kein APNs-Token wird an externe Server übermittelt.
 *
 * Ablauf:
 * 1. App empfängt P2P-Update für eine Zelle
 * 2. Wenn Zelle im konfigurierten Radius der Nutzer-Position → lokale Notification
 */

import * as Notifications from 'expo-notifications';
import type { CellAggregate } from '@peopleseyes/core-model';
import { getNeighborCells } from '@peopleseyes/core-logic';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false, // Kein Ton – diskret
    shouldSetBadge: false,
  }),
});

/**
 * Fragt Notification-Berechtigung an.
 * Gibt true zurück wenn erteilt.
 */
export async function requestNotificationPermission(): Promise<boolean> {
  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === 'granted') return true;

  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

/**
 * Sendet eine lokale Benachrichtigung über eine neue Sichtung.
 *
 * @param aggregate  - Das neue CellAggregate
 * @param distanceCells - Entfernung zur Nutzerposition in H3-Zellen
 */
export async function notifyNearbyReport(
  aggregate: CellAggregate,
  distanceCells: number,
): Promise<void> {
  const distanceText = distanceCells === 0 ? 'In deiner Nähe' : `~${distanceCells * 5} km entfernt`;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: `Neue Sichtung – ${distanceText}`,
      body: `${aggregate.reportCount} Meldung${aggregate.reportCount > 1 ? 'en' : ''} in diesem Bereich`,
      data: { cellId: aggregate.cellId },
    },
    trigger: null, // Sofort
  });
}

/**
 * Prüft ob ein CellAggregate im Benachrichtigungs-Radius liegt.
 *
 * @param aggregate      - Eingehende Meldung
 * @param userCellId     - Aktuelle H3-Zelle des Nutzers
 * @param radiusCells    - Maximale Entfernung in H3-Zellen (1-3)
 */
export function isInNotificationRadius(
  aggregate: CellAggregate,
  userCellId: string | null,
  radiusCells: number,
): boolean {
  if (!userCellId) return false;
  if (aggregate.cellId === userCellId) return true;

  const neighbors = getNeighborCells(userCellId, radiusCells);
  return neighbors.includes(aggregate.cellId);
}

/**
 * Löscht alle ausstehenden Benachrichtigungen.
 */
export async function clearAllNotifications(): Promise<void> {
  await Notifications.dismissAllNotificationsAsync();
  await Notifications.cancelAllScheduledNotificationsAsync();
}
