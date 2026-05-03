import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const DATA_DIR = join(process.cwd(), ".data");
const LOG_FILE = join(DATA_DIR, "donation-log.json");

export type DonationRecord = {
  id: string;
  amount: number;
  donorName: string;
  donorEmail: string;
  method: string;
  childName?: string;
  childId?: string;
  message?: string;
  timestamp: string;
};

function ensureDir(): void {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
}

export function readDonationLog(): DonationRecord[] {
  try {
    if (!existsSync(LOG_FILE)) return [];
    return JSON.parse(readFileSync(LOG_FILE, "utf-8")) as DonationRecord[];
  } catch {
    return [];
  }
}

export function appendDonation(record: Omit<DonationRecord, "id" | "timestamp">): DonationRecord {
  const log = readDonationLog();
  const entry: DonationRecord = {
    ...record,
    id: `don_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    timestamp: new Date().toISOString(),
  };
  log.unshift(entry);
  ensureDir();
  writeFileSync(LOG_FILE, JSON.stringify(log, null, 2), "utf-8");
  return entry;
}
