import { Router, type IRouter } from "express";
import { addSubscriber, readSubscribers } from "../lib/newsletterStore";
import { sendWelcomeEmail } from "../lib/mailer";
import { requireAdmin } from "../lib/adminAuth";

const router: IRouter = Router();

router.post("/newsletter/subscribe", async (req, res) => {
  const { email, name } = req.body as { email?: string; name?: string };
  if (!email || !email.includes("@")) {
    res.status(400).json({ error: "A valid email address is required." });
    return;
  }
  const { added, subscriber } = addSubscriber(email, name);
  if (!added) {
    res.json({ success: true, alreadySubscribed: true });
    return;
  }
  void sendWelcomeEmail(subscriber.email, subscriber.name);
  res.json({ success: true, alreadySubscribed: false });
});

router.get("/admin/newsletter", requireAdmin, (_req, res) => {
  res.json(readSubscribers());
});

export default router;
