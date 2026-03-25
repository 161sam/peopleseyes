import type { Report } from '@peopleseyes/core-model';
import { validateReport } from '@peopleseyes/core-logic';

/**
 * Offline-Queue für Reports die während fehlender P2P-Verbindung erstellt wurden.
 *
 * SEC-03 fix: sessionStorage statt localStorage.
 * Fehler 4 fix: geladene Queue-Einträge werden gegen validateReport() geprüft —
 * ein korrumpierter sessionStorage-Eintrag führt nicht mehr zu einem stillen Fehler.
 */

const QUEUE_KEY = 'pe:offline-report-queue';

function readQueue(): Report[] {
  try {
    const raw = sessionStorage.getItem(QUEUE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown[];
    if (!Array.isArray(parsed)) return [];
    // Nur valide Reports akzeptieren – korrumpierte Einträge stillschweigend verwerfen
    const now = Date.now();
    return parsed.filter((item): item is Report => validateReport(item, now));
  } catch {
    return [];
  }
}

function writeQueue(queue: Report[]): void {
  sessionStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
}

export const offlineQueue = {
  all(): Report[] {
    return readQueue();
  },
  enqueue(report: Report): void {
    const queue = readQueue();
    queue.push(report);
    writeQueue(queue);
  },
  clear(): void {
    sessionStorage.removeItem(QUEUE_KEY);
  },
};
