import type { Report } from '@peopleseyes/core-model';

const QUEUE_KEY = 'pe:offline-report-queue';

function readQueue(): Report[] {
  try {
    const raw = localStorage.getItem(QUEUE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Report[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeQueue(queue: Report[]): void {
  localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
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
    writeQueue([]);
  },
};
