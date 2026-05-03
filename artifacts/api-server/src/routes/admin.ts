import { Router, type IRouter } from "express";
import { signToken, requireAdmin } from "../lib/adminAuth";
import { readChildren, addChild, updateChild, deleteChild } from "../lib/childrenStore";
import { readDonationLog } from "../lib/donationLog";
import { readEmailConfig, writeEmailConfig, type EmailConfig } from "../lib/emailConfig";
import { type Child } from "../data/children";
import nodemailer from "nodemailer";

const router: IRouter = Router();

router.post("/admin/login", (req, res) => {
  const { password } = req.body as { password?: string };
  const expected = process.env["ADMIN_PASSWORD"] ?? "zealcare2024";
  if (!password || password !== expected) {
    res.status(401).json({ error: "Invalid password" });
    return;
  }
  res.json({ token: signToken() });
});

router.get("/admin/stats", requireAdmin, (_req, res) => {
  const children = readChildren();
  const donations = readDonationLog();
  const sponsoredChildren = children.filter((c) => c.isSponsored).length;
  res.json({
    totalCount: donations.length,
    totalAmount: donations.reduce((sum, d) => sum + (d.amount ?? 0), 0),
    childrenSponsored: sponsoredChildren,
    lastUpdated: donations[0]?.timestamp ?? new Date().toISOString(),
    totalChildren: children.length,
    sponsoredChildren,
    availableChildren: children.filter((c) => !c.isSponsored).length,
    recentDonations: donations.slice(0, 5),
  });
});

router.get("/admin/donations", requireAdmin, (_req, res) => {
  res.json(readDonationLog());
});

router.get("/admin/children", requireAdmin, (_req, res) => {
  res.json(readChildren());
});

router.post("/admin/children", requireAdmin, (req, res) => {
  const body = req.body as Partial<Child>;
  const child: Child = {
    id: `c${Date.now()}`,
    name: body.name ?? "Unknown",
    age: Number(body.age) || 10,
    grade: body.grade ?? "",
    school: body.school ?? "",
    location: body.location ?? "Monrovia, Liberia",
    story: body.story ?? "",
    needs: Array.isArray(body.needs) ? body.needs : [],
    isSponsored: false,
    joinedYear: new Date().getFullYear(),
    avatarColor: body.avatarColor ?? "#1A44C0",
  };
  const all = addChild(child);
  res.json({ child, total: all.length });
});

router.put("/admin/children/:id", requireAdmin, (req, res) => {
  const { id } = req.params;
  try {
    const all = updateChild(id, req.body as Partial<Child>);
    res.json({ success: true, total: all.length });
  } catch {
    res.status(404).json({ error: "Child not found" });
  }
});

router.delete("/admin/children/:id", requireAdmin, (req, res) => {
  const { id } = req.params;
  const all = deleteChild(id);
  res.json({ success: true, total: all.length });
});

router.get("/admin/email-config", requireAdmin, (_req, res) => {
  const config = readEmailConfig();
  res.json({ ...config, smtpPassSet: !!process.env["SMTP_PASS"] });
});

router.post("/admin/email-config", requireAdmin, (req, res) => {
  const body = req.body as Partial<EmailConfig & { smtpPass?: string }>;
  const current = readEmailConfig();
  const updated: EmailConfig = {
    smtpHost: body.smtpHost ?? current.smtpHost,
    smtpPort: Number(body.smtpPort) || current.smtpPort,
    smtpUser: body.smtpUser ?? current.smtpUser,
    notifyEmail: body.notifyEmail ?? current.notifyEmail,
    enabled: body.enabled ?? current.enabled,
  };
  if (body.smtpPass) {
    process.env["SMTP_PASS"] = body.smtpPass;
  }
  writeEmailConfig(updated);
  res.json({ success: true, config: updated });
});

router.post("/admin/email-test", requireAdmin, async (req, res) => {
  const config = readEmailConfig();
  const smtpPass = process.env["SMTP_PASS"];
  if (!smtpPass || !config.smtpUser) {
    res.status(400).json({ error: "SMTP not configured. Set SMTP_USER and SMTP_PASS first." });
    return;
  }
  try {
    const transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: false,
      auth: { user: config.smtpUser, pass: smtpPass },
    });
    await transporter.sendMail({
      from: `"Zeal Care Admin" <${config.smtpUser}>`,
      to: config.notifyEmail || config.smtpUser,
      subject: "✅ Zeal Care Email Test",
      text: "Your email notifications are working correctly for the Zeal Care website.",
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

export default router;
