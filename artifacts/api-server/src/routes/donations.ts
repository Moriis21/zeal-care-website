import { Router, type IRouter } from "express";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const router: IRouter = Router();

const DATA_DIR = join(process.cwd(), ".data");
const DATA_FILE = join(DATA_DIR, "donations.json");

type DonationStats = {
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

function readStats(): DonationStats {
  try {
    if (!existsSync(DATA_FILE)) return { ...INITIAL_STATS };
    const raw = readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw) as DonationStats;
  } catch {
    return { ...INITIAL_STATS };
  }
}

function writeStats(stats: DonationStats): void {
  try {
    if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
    writeFileSync(DATA_FILE, JSON.stringify(stats, null, 2), "utf-8");
  } catch {
  }
}

router.get("/donations/stats", (req, res) => {
  const stats = readStats();
  res.json(stats);
});

router.post("/donations/record", (req, res) => {
  const { amount } = req.body as { amount?: number };
  const stats = readStats();
  const donationAmount = Number(amount) || 0;
  const childrenAdded = donationAmount >= 150 ? Math.floor(donationAmount / 150) : 0;

  const updated: DonationStats = {
    totalCount: stats.totalCount + 1,
    totalAmount: stats.totalAmount + donationAmount,
    childrenSponsored: stats.childrenSponsored + (childrenAdded > 0 ? childrenAdded : 0),
    lastUpdated: new Date().toISOString(),
  };
  writeStats(updated);
  req.log.info({ donationAmount, childrenAdded }, "Donation recorded");
  res.json(updated);
});

export default router;
