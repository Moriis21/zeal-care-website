import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const DATA_DIR = join(process.cwd(), ".data");
const DATA_FILE = join(DATA_DIR, "donations.json");

export type DonationStats = {
  totalCount: number;
  totalAmount: number;
  childrenSponsored: number;
  lastUpdated: string;
};

const INITIAL_STATS: DonationStats = {
  totalCount: 47,
  totalAmount: 18650,
  childrenSponsored: 124,
  lastUpdated: new Date().toISOString(),
};

export function readStats(): DonationStats {
  try {
    if (!existsSync(DATA_FILE)) return { ...INITIAL_STATS };
    return JSON.parse(readFileSync(DATA_FILE, "utf-8")) as DonationStats;
  } catch {
    return { ...INITIAL_STATS };
  }
}

export function writeStats(stats: DonationStats): void {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(DATA_FILE, JSON.stringify(stats, null, 2), "utf-8");
}
