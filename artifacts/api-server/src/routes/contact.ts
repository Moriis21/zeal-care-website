import { Router, type IRouter } from "express";
import { appendMessage, readMessages, markRead, deleteMessage } from "../lib/contactStore";
import { sendContactNotification } from "../lib/mailer";
import { requireAdmin } from "../lib/adminAuth";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body as {
    name?: string; email?: string; subject?: string; message?: string;
  };
  if (!name || !email || !message) {
    res.status(400).json({ error: "Name, email, and message are required." });
    return;
  }
  if (!email.includes("@")) {
    res.status(400).json({ error: "A valid email address is required." });
    return;
  }
  const entry = appendMessage({ name, email, subject, message });
  void sendContactNotification(entry);
  req.log.info({ name, email }, "Contact message received");
  res.json({ success: true, id: entry.id });
});

router.get("/admin/messages", requireAdmin, (_req, res) => {
  res.json(readMessages());
});

router.patch("/admin/messages/:id/read", requireAdmin, (req, res) => {
  const ok = markRead(req.params.id);
  ok ? res.json({ success: true }) : res.status(404).json({ error: "Not found" });
});

router.delete("/admin/messages/:id", requireAdmin, (req, res) => {
  const ok = deleteMessage(req.params.id);
  ok ? res.json({ success: true }) : res.status(404).json({ error: "Not found" });
});

export default router;
