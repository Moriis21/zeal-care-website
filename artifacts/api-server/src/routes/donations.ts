import { Router, type IRouter } from "express";
import { appendDonation, readDonationLog } from "../lib/donationLog";
import { readChildren } from "../lib/childrenStore";
import { sendDonationNotification, sendThankYouEmail, sendMomoInterestNotification } from "../lib/mailer";

const router: IRouter = Router();

function computeStats() {
  const log = readDonationLog();
  const children = readChildren();

  const totalCount = log.length;
  const totalAmount = log.reduce((sum, d) => sum + (d.amount ?? 0), 0);
  const childrenSponsored = children.filter((c) => c.isSponsored).length;
  const lastUpdated = log[0]?.timestamp ?? new Date().toISOString();

  return { totalCount, totalAmount, childrenSponsored, lastUpdated };
}

router.get("/donations/stats", (_req, res) => {
  res.json(computeStats());
});

router.post("/donations/record", (req, res) => {
  const {
    amount, donorName, donorEmail, method, momoPhone, childName, childId, message,
  } = req.body as {
    amount?: number; donorName?: string; donorEmail?: string;
    method?: string; momoPhone?: string; childName?: string; childId?: string; message?: string;
  };

  const donationAmount = Number(amount) || 0;

  appendDonation({
    amount: donationAmount,
    donorName: donorName ?? "",
    donorEmail: donorEmail ?? "",
    method: method ?? "other",
    momoPhone, childName, childId, message,
  });

  req.log.info({ donationAmount }, "Donation recorded");

  const payload = {
    amount: donationAmount,
    donorName: donorName ?? "",
    donorEmail: donorEmail ?? "",
    method: method ?? "other",
    childName, childId, message,
  };

  if (method === "momo") {
    void sendMomoInterestNotification({
      donorName: donorName ?? "",
      donorEmail: donorEmail ?? "",
      momoPhone: momoPhone ?? "",
      amount: donationAmount,
    });
  } else {
    void sendDonationNotification(payload);
    void sendThankYouEmail(payload);
  }

  res.json(computeStats());
});

export default router;
