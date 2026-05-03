import nodemailer from "nodemailer";
import { logger } from "./logger";

type DonationNotification = {
  donorName: string;
  donorEmail: string;
  amount: number;
  method: string;
  childName?: string;
  childId?: string;
  message?: string;
};

function isConfigured(): boolean {
  return !!(process.env["SMTP_USER"] && process.env["SMTP_PASS"] && process.env["NOTIFY_EMAIL"]);
}

function createTransport() {
  return nodemailer.createTransport({
    host: process.env["SMTP_HOST"] ?? "smtp.gmail.com",
    port: Number(process.env["SMTP_PORT"] ?? 587),
    secure: false,
    auth: {
      user: process.env["SMTP_USER"],
      pass: process.env["SMTP_PASS"],
    },
  });
}

function buildHtml(n: DonationNotification): string {
  const methodLabel: Record<string, string> = {
    mobile: "Mobile Money (*156*3*0887071690#)",
    bank: "Bank Transfer",
    card: "Card Payment",
    other: "Other",
  };
  const displayMethod = methodLabel[n.method] ?? n.method;
  const childBlock = n.childName
    ? `<tr><td style="padding:8px 0;color:#64748b;font-size:14px;">Sponsoring</td><td style="padding:8px 0;font-weight:700;color:#061A32;font-size:14px;">${n.childName}</td></tr>`
    : "";
  const messageBlock = n.message
    ? `<p style="margin:16px 0 0;padding:12px 16px;background:#f8fafc;border-left:4px solid #F5C619;border-radius:4px;color:#475569;font-size:13px;font-style:italic;">"${n.message}"</p>`
    : "";

  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:#061A32;padding:28px 36px;">
            <table width="100%"><tr>
              <td>
                <div style="width:40px;height:40px;background:#F5C619;border-radius:50%;display:inline-block;text-align:center;line-height:40px;font-weight:900;font-size:18px;color:#061A32;vertical-align:middle;margin-right:10px;">Z</div>
                <span style="color:#ffffff;font-size:20px;font-weight:900;vertical-align:middle;">ZEAL CARE</span>
              </td>
              <td align="right">
                <span style="background:#F5C619;color:#061A32;padding:6px 14px;border-radius:20px;font-size:12px;font-weight:700;letter-spacing:0.5px;">NEW DONATION 💛</span>
              </td>
            </tr></table>
          </td>
        </tr>

        <!-- Amount Hero -->
        <tr>
          <td style="background:linear-gradient(135deg,#1A44C0,#061A32);padding:32px 36px;text-align:center;">
            <p style="margin:0;color:rgba(255,255,255,0.7);font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;">Donation Received</p>
            <p style="margin:8px 0 0;color:#F5C619;font-size:52px;font-weight:900;letter-spacing:-1px;">$${n.amount.toLocaleString()}</p>
            <p style="margin:6px 0 0;color:rgba(255,255,255,0.6);font-size:13px;">via ${displayMethod}</p>
          </td>
        </tr>

        <!-- Details -->
        <tr>
          <td style="padding:32px 36px;">
            <h2 style="margin:0 0 20px;color:#061A32;font-size:18px;">Donor Details</h2>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e2e8f0;">
              <tr>
                <td style="padding:8px 0;color:#64748b;font-size:14px;width:140px;">Donor Name</td>
                <td style="padding:8px 0;font-weight:700;color:#061A32;font-size:14px;">${n.donorName || "Anonymous"}</td>
              </tr>
              <tr style="border-top:1px solid #f1f5f9;">
                <td style="padding:8px 0;color:#64748b;font-size:14px;">Email</td>
                <td style="padding:8px 0;font-weight:700;color:#061A32;font-size:14px;">${n.donorEmail || "Not provided"}</td>
              </tr>
              <tr style="border-top:1px solid #f1f5f9;">
                <td style="padding:8px 0;color:#64748b;font-size:14px;">Amount</td>
                <td style="padding:8px 0;font-weight:700;color:#061A32;font-size:14px;">$${n.amount.toLocaleString()} USD</td>
              </tr>
              <tr style="border-top:1px solid #f1f5f9;">
                <td style="padding:8px 0;color:#64748b;font-size:14px;">Method</td>
                <td style="padding:8px 0;font-weight:700;color:#061A32;font-size:14px;">${displayMethod}</td>
              </tr>
              ${childBlock ? `<tr style="border-top:1px solid #f1f5f9;">${childBlock.replace("<tr>", "").replace("</tr>", "")}</tr>` : ""}
            </table>
            ${messageBlock}
          </td>
        </tr>

        <!-- Action -->
        <tr>
          <td style="padding:0 36px 32px;">
            <div style="background:#f8fafc;border-radius:12px;padding:20px;border:1px solid #e2e8f0;">
              <p style="margin:0 0 8px;font-weight:700;color:#061A32;font-size:14px;">⚡ Next Steps</p>
              <ul style="margin:0;padding-left:18px;color:#475569;font-size:13px;line-height:1.8;">
                <li>Verify the payment was received via the stated method</li>
                <li>Send a thank-you email to ${n.donorEmail || "the donor"}</li>
                ${n.childName ? `<li>Update <strong>${n.childName}</strong>'s sponsorship record</li>` : ""}
                <li>Send a sponsorship confirmation certificate</li>
              </ul>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8fafc;padding:20px 36px;border-top:1px solid #e2e8f0;text-align:center;">
            <p style="margin:0;color:#94a3b8;font-size:12px;">Zeal Care · Monrovia, Liberia · info@zealcare.org · +231 886 727 619</p>
            <p style="margin:4px 0 0;color:#94a3b8;font-size:11px;">This is an automated notification from the Zeal Care website.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function sendDonationNotification(notification: DonationNotification): Promise<void> {
  if (!isConfigured()) {
    logger.info({ notification }, "Email not configured — donation notification logged only");
    return;
  }
  try {
    const transporter = createTransport();
    const childLabel = notification.childName ? ` — Sponsoring ${notification.childName}` : "";
    await transporter.sendMail({
      from: `"Zeal Care Website" <${process.env["SMTP_USER"]}>`,
      to: process.env["NOTIFY_EMAIL"],
      subject: `💛 New Donation: $${notification.amount.toLocaleString()}${childLabel}`,
      html: buildHtml(notification),
    });
    logger.info({ amount: notification.amount, childName: notification.childName }, "Donation notification email sent");
  } catch (err) {
    logger.error({ err }, "Failed to send donation notification email");
  }
}
