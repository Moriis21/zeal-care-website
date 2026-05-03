import { Router, type IRouter } from "express";
import { readStats, writeStats } from "./donationStats";
import { appendDonation } from "../lib/donationLog";
import { sendDonationNotification } from "../lib/mailer";

const router: IRouter = Router();

router.get("/donations/stats", (req, res) => {
  res.json(readStats());
});

router.post("/donations/record", (req, res) => {
  const {
    amount, donorName, donorEmail, method, childName, childId, message,
  } = req.body as {
    amount?: number; donorName?: string; donorEmail?: string;
    method?: string; childName?: string; childId?: string; message?: string;
  };

  const donationAmount = Number(amount) || 0;
  const childrenAdded = donationAmount >= 150 ? Math.floor(donationAmount / 150) : 0;
  const stats = readStats();

  const updated = {
    totalCount: stats.totalCount + 1,
    totalAmount: stats.totalAmount + donationAmount,
    childrenSponsored: stats.childrenSponsored + (childrenAdded > 0 ? childrenAdded : 0),
    lastUpdated: new Date().toISOString(),
  };
  writeStats(updated);

  appendDonation({
    amount: donationAmount,
    donorName: donorName ?? "",
    donorEmail: donorEmail ?? "",
    method: method ?? "other",
    childName, childId, message,
  });

  req.log.info({ donationAmount, childrenAdded }, "Donation recorded");

  void sendDonationNotification({
    amount: donationAmount,
    donorName: donorName ?? "",
    donorEmail: donorEmail ?? "",
    method: method ?? "other",
    childName, childId, message,
  });

  res.json(updated);
});

export default router;
