import { Router, type IRouter } from "express";
import { appendMessage, readMessages, markRead, markAllRead, deleteMessage } from "../lib/contactStore";
import { sendContactNotification, sendReplyEmail } from "../lib/mailer";
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

router.patch("/admin/messages/read-all", requireAdmin, (_req, res) => {
  const count = markAllRead();
  res.json({ success: true, count });
});

router.patch("/admin/messages/:id/read", requireAdmin, (req, res) => {
  const ok = markRead(String(req.params.id));
  ok ? res.json({ success: true }) : res.status(404).json({ error: "Not found" });
});

router.post("/admin/messages/:id/reply", requireAdmin, async (req, res) => {
  const { replyText } = req.body as { replyText?: string };
  if (!replyText?.trim()) {
    res.status(400).json({ error: "Reply text is required." });
    return;
  }
  const all = readMessages();
  const msg = all.find((m) => m.id === req.params.id);
  if (!msg) { res.status(404).json({ error: "Message not found." }); return; }
  markRead(String(req.params.id));
  const result = await sendReplyEmail({ to: msg.email, name: msg.name, subject: msg.subject, originalMessage: msg.message, replyText });
  req.log.info({ to: msg.email }, "Admin replied to contact message");
  res.json({ success: true, emailSent: result.sent, emailError: result.error });
});

router.delete("/admin/messages/:id", requireAdmin, (req, res) => {
  const ok = deleteMessage(String(req.params.id));
  ok ? res.json({ success: true }) : res.status(404).json({ error: "Not found" });
});

export default router;
