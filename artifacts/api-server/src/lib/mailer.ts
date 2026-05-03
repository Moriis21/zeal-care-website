import nodemailer from "nodemailer";
import { logger } from "./logger";
import { readEmailConfig } from "./emailConfig";

type DonationNotification = {
  donorName: string;
  donorEmail: string;
  amount: number;
  method: string;
  childName?: string;
  childId?: string;
  message?: string;
};

function createTransporter() {
  const config = readEmailConfig();
  const smtpPass = process.env["SMTP_PASS"];
  if (!config.enabled || !smtpPass || !config.smtpUser) return null;
  return nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: false,
    auth: { user: config.smtpUser, pass: smtpPass },
  });
}

function senderFrom() {
  const config = readEmailConfig();
  return `"Zeal Care" <${config.smtpUser}>`;
}

/* ─── Admin notification email ─── */
function buildAdminHtml(n: DonationNotification, notifyEmail: string): string {
  const methodLabel: Record<string, string> = {
    mobile: "Mobile Money (*156*3*0887071690#)",
    bank: "Bank Transfer",
    card: "Card Payment",
    other: "Other",
  };
  const displayMethod = methodLabel[n.method] ?? n.method;
  const childRow = n.childName
    ? `<tr style="border-top:1px solid #f1f5f9;"><td style="padding:8px 0;color:#64748b;font-size:14px;width:140px;">Sponsoring</td><td style="padding:8px 0;font-weight:700;color:#061A32;font-size:14px;">${n.childName}</td></tr>`
    : "";
  const msgBlock = n.message
    ? `<p style="margin:16px 0 0;padding:12px 16px;background:#f8fafc;border-left:4px solid #F5C619;border-radius:4px;color:#475569;font-size:13px;font-style:italic;">"${n.message}"</p>`
    : "";

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;"><tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
      <tr><td style="background:#061A32;padding:28px 36px;">
        <table width="100%"><tr>
          <td><div style="width:40px;height:40px;background:#F5C619;border-radius:50%;display:inline-block;text-align:center;line-height:40px;font-weight:900;font-size:18px;color:#061A32;vertical-align:middle;margin-right:10px;">Z</div>
          <span style="color:#fff;font-size:20px;font-weight:900;vertical-align:middle;">ZEAL CARE</span></td>
          <td align="right"><span style="background:#F5C619;color:#061A32;padding:6px 14px;border-radius:20px;font-size:12px;font-weight:700;">NEW DONATION 💛</span></td>
        </tr></table>
      </td></tr>
      <tr><td style="background:linear-gradient(135deg,#1A44C0,#061A32);padding:32px 36px;text-align:center;">
        <p style="margin:0;color:rgba(255,255,255,0.7);font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Donation Received</p>
        <p style="margin:8px 0 0;color:#F5C619;font-size:52px;font-weight:900;letter-spacing:-1px;">$${n.amount.toLocaleString()}</p>
        <p style="margin:6px 0 0;color:rgba(255,255,255,0.6);font-size:13px;">via ${displayMethod}</p>
      </td></tr>
      <tr><td style="padding:32px 36px;">
        <h2 style="margin:0 0 20px;color:#061A32;font-size:18px;">Donor Details</h2>
        <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e2e8f0;">
          <tr><td style="padding:8px 0;color:#64748b;font-size:14px;width:140px;">Donor Name</td><td style="padding:8px 0;font-weight:700;color:#061A32;font-size:14px;">${n.donorName || "Anonymous"}</td></tr>
          <tr style="border-top:1px solid #f1f5f9;"><td style="padding:8px 0;color:#64748b;font-size:14px;">Email</td><td style="padding:8px 0;font-weight:700;color:#061A32;font-size:14px;">${n.donorEmail || "Not provided"}</td></tr>
          <tr style="border-top:1px solid #f1f5f9;"><td style="padding:8px 0;color:#64748b;font-size:14px;">Amount</td><td style="padding:8px 0;font-weight:700;color:#1A44C0;font-size:14px;">$${n.amount.toLocaleString()} USD</td></tr>
          <tr style="border-top:1px solid #f1f5f9;"><td style="padding:8px 0;color:#64748b;font-size:14px;">Method</td><td style="padding:8px 0;font-weight:700;color:#061A32;font-size:14px;">${displayMethod}</td></tr>
          ${childRow}
        </table>
        ${msgBlock}
      </td></tr>
      <tr><td style="padding:0 36px 32px;">
        <div style="background:#f8fafc;border-radius:12px;padding:20px;border:1px solid #e2e8f0;">
          <p style="margin:0 0 8px;font-weight:700;color:#061A32;font-size:14px;">⚡ Next Steps</p>
          <ul style="margin:0;padding-left:18px;color:#475569;font-size:13px;line-height:1.8;">
            <li>Verify the payment was received via the stated method</li>
            <li>Send a thank-you email to ${n.donorEmail || "the donor"}</li>
            ${n.childName ? `<li>Update <strong>${n.childName}</strong>'s sponsorship record</li>` : ""}
            <li>Log this donation in your <a href="https://${process.env["REPLIT_DEV_DOMAIN"] ?? "your-site"}/admin/donations" style="color:#1A44C0;">Admin → Donations</a></li>
          </ul>
        </div>
      </td></tr>
      <tr><td style="background:#f8fafc;padding:20px 36px;border-top:1px solid #e2e8f0;text-align:center;">
        <p style="margin:0;color:#94a3b8;font-size:12px;">Zeal Care · Monrovia, Liberia · info@zealcare.org · +231 886 727 619</p>
        <p style="margin:4px 0 0;color:#94a3b8;font-size:11px;">Automated notification sent to ${notifyEmail}.</p>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`;
}

/* ─── Donor thank-you email ─── */
function buildThankYouHtml(n: DonationNotification): string {
  const firstName = (n.donorName || "Friend").split(" ")[0];
  const childBlock = n.childName
    ? `<div style="background:linear-gradient(135deg,#1A44C020,#1A44C010);border:1px solid #1A44C030;border-radius:16px;padding:20px 24px;margin:24px 0;text-align:center;">
        <p style="margin:0 0 4px;color:#64748b;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">You are now sponsoring</p>
        <p style="margin:0;font-size:26px;font-weight:900;color:#061A32;">${n.childName}</p>
        <p style="margin:6px 0 0;color:#1A44C0;font-size:13px;">Your monthly support gives ${n.childName.split(" ")[0]} access to education, meals, and hope.</p>
      </div>`
    : "";

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;"><tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
      <tr><td style="background:#061A32;padding:28px 36px;text-align:center;">
        <div style="width:52px;height:52px;background:#F5C619;border-radius:50%;display:inline-block;text-align:center;line-height:52px;font-weight:900;font-size:24px;color:#061A32;margin-bottom:12px;">Z</div>
        <p style="margin:0;color:#fff;font-size:22px;font-weight:900;letter-spacing:2px;">ZEAL CARE</p>
        <p style="margin:4px 0 0;color:rgba(255,255,255,0.5);font-size:12px;">Igniting Potential, Inspiring Change</p>
      </td></tr>
      <tr><td style="padding:40px 36px 24px;text-align:center;">
        <div style="width:64px;height:64px;background:#FEF9C3;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:32px;margin-bottom:16px;">💛</div>
        <h1 style="margin:0 0 8px;color:#061A32;font-size:28px;font-weight:900;">Thank You, ${firstName}!</h1>
        <p style="margin:0;color:#64748b;font-size:16px;line-height:1.6;">Your generosity is changing lives in Monrovia, Liberia.<br/>We are deeply grateful for your support.</p>
      </td></tr>
      <tr><td style="padding:0 36px;">
        <div style="background:linear-gradient(135deg,#F5C61915,#F5C61930);border:1px solid #F5C61950;border-radius:16px;padding:24px;text-align:center;">
          <p style="margin:0 0 4px;color:#64748b;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Your Donation</p>
          <p style="margin:0;font-size:42px;font-weight:900;color:#061A32;">$${n.amount.toLocaleString()}</p>
          <p style="margin:6px 0 0;color:#64748b;font-size:13px;">via ${n.method === "mobile" ? "Mobile Money" : n.method === "bank" ? "Bank Transfer" : "Card"}</p>
        </div>
        ${childBlock}
        <div style="margin:24px 0;">
          <h3 style="margin:0 0 16px;color:#061A32;font-size:16px;font-weight:700;">Your gift provides:</h3>
          <table width="100%" cellpadding="0" cellspacing="0">
            ${[["📚", "School fees & supplies"], ["🍽️", "Daily nutritious meals"], ["💻", "Technology & mentorship"], ["🏫", "Safe learning environment"]].map(([icon, text]) =>
              `<tr><td style="padding:8px 0;color:#475569;font-size:14px;"><span style="margin-right:10px;">${icon}</span>${text}</td></tr>`
            ).join("")}
          </table>
        </div>
      </td></tr>
      <tr><td style="padding:0 36px 36px;text-align:center;">
        <a href="https://${process.env["REPLIT_DEV_DOMAIN"] ?? "zealcare.org"}/" style="display:inline-block;background:#F5C619;color:#061A32;font-weight:900;font-size:14px;padding:14px 32px;border-radius:50px;text-decoration:none;letter-spacing:0.5px;">Visit Our Website →</a>
        <p style="margin:20px 0 0;color:#94a3b8;font-size:13px;">Share the impact — tell a friend about Zeal Care!</p>
      </td></tr>
      <tr><td style="background:#f8fafc;padding:20px 36px;border-top:1px solid #e2e8f0;text-align:center;">
        <p style="margin:0;color:#94a3b8;font-size:12px;">Questions? Email us at <a href="mailto:info@zealcare.org" style="color:#1A44C0;">info@zealcare.org</a> or call +231 886 727 619</p>
        <p style="margin:6px 0 0;color:#94a3b8;font-size:11px;">Zeal Care · Monrovia, Liberia · Empowering Africa's Future Leaders</p>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`;
}

/* ─── Newsletter welcome email ─── */
function buildWelcomeHtml(email: string, name?: string): string {
  const firstName = name ? name.split(" ")[0] : "Friend";
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;"><tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
      <tr><td style="background:#061A32;padding:28px 36px;text-align:center;">
        <div style="width:52px;height:52px;background:#F5C619;border-radius:50%;display:inline-block;text-align:center;line-height:52px;font-weight:900;font-size:24px;color:#061A32;margin-bottom:12px;">Z</div>
        <p style="margin:0;color:#fff;font-size:22px;font-weight:900;letter-spacing:2px;">ZEAL CARE</p>
      </td></tr>
      <tr><td style="padding:40px 36px;text-align:center;">
        <div style="font-size:40px;margin-bottom:16px;">🎉</div>
        <h1 style="margin:0 0 12px;color:#061A32;font-size:26px;font-weight:900;">Welcome, ${firstName}!</h1>
        <p style="margin:0;color:#64748b;font-size:15px;line-height:1.7;">You're now part of the Zeal Care community. Thank you for joining us on our mission to ignite potential and inspire change across Liberia.</p>
        <div style="margin:28px 0;background:#f8fafc;border-radius:12px;padding:20px;">
          <p style="margin:0 0 12px;font-weight:700;color:#061A32;font-size:14px;">What to expect from us:</p>
          <p style="margin:0;color:#475569;font-size:13px;line-height:1.8;">✉️ Monthly impact reports<br/>📸 Stories from our children<br/>🌍 Updates on our programs<br/>💛 Ways to get involved</p>
        </div>
        <a href="https://${process.env["REPLIT_DEV_DOMAIN"] ?? "zealcare.org"}/" style="display:inline-block;background:#F5C619;color:#061A32;font-weight:900;font-size:14px;padding:14px 32px;border-radius:50px;text-decoration:none;">Explore Our Work →</a>
      </td></tr>
      <tr><td style="background:#f8fafc;padding:20px 36px;border-top:1px solid #e2e8f0;text-align:center;">
        <p style="margin:0;color:#94a3b8;font-size:12px;">You subscribed with ${email}. To unsubscribe, reply to this email.</p>
        <p style="margin:4px 0 0;color:#94a3b8;font-size:11px;">Zeal Care · Monrovia, Liberia · info@zealcare.org</p>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`;
}

/* ─── MTN MoMo interest notification ─── */
type MomoInterest = {
  donorName: string;
  donorEmail: string;
  momoPhone: string;
  amount: number;
};

function buildMomoInterestHtml(n: MomoInterest, notifyEmail: string): string {
  const adminUrl = `https://${process.env["REPLIT_DEV_DOMAIN"] ?? "your-site"}/admin/donations`;
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;"><tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

      <!-- Header -->
      <tr><td style="background:#061A32;padding:28px 36px;">
        <table width="100%"><tr>
          <td><div style="width:40px;height:40px;background:#F5C619;border-radius:50%;display:inline-block;text-align:center;line-height:40px;font-weight:900;font-size:18px;color:#061A32;vertical-align:middle;margin-right:10px;">Z</div>
          <span style="color:#fff;font-size:20px;font-weight:900;vertical-align:middle;">ZEAL CARE</span></td>
          <td align="right"><span style="background:#FBBF24;color:#78350F;padding:6px 14px;border-radius:20px;font-size:12px;font-weight:700;">⚡ MTN MoMo INTEREST</span></td>
        </tr></table>
      </td></tr>

      <!-- Hero -->
      <tr><td style="background:linear-gradient(135deg,#92400E,#B45309);padding:32px 36px;text-align:center;">
        <p style="margin:0 0 8px;color:rgba(255,255,255,0.7);font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">New MTN MoMo Donor Registered</p>
        <p style="margin:0;color:#FDE68A;font-size:48px;font-weight:900;letter-spacing:-1px;">$${n.amount.toLocaleString()}</p>
        <p style="margin:8px 0 0;color:rgba(255,255,255,0.6);font-size:13px;">Intended donation amount via MTN MoMo</p>
      </td></tr>

      <!-- Details -->
      <tr><td style="padding:32px 36px;">
        <h2 style="margin:0 0 20px;color:#061A32;font-size:18px;">Donor Details</h2>
        <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e2e8f0;">
          <tr><td style="padding:10px 0;color:#64748b;font-size:14px;width:150px;">Name</td><td style="padding:10px 0;font-weight:700;color:#061A32;font-size:14px;">${n.donorName || "Anonymous"}</td></tr>
          <tr style="border-top:1px solid #f1f5f9;"><td style="padding:10px 0;color:#64748b;font-size:14px;">MTN MoMo Number</td>
            <td style="padding:10px 0;font-size:14px;">
              <span style="background:#FEF3C7;color:#92400E;font-weight:900;font-size:15px;padding:4px 12px;border-radius:8px;font-family:monospace;">${n.momoPhone}</span>
            </td>
          </tr>
          <tr style="border-top:1px solid #f1f5f9;"><td style="padding:10px 0;color:#64748b;font-size:14px;">Email</td><td style="padding:10px 0;font-size:14px;"><a href="mailto:${n.donorEmail}" style="color:#1A44C0;font-weight:700;">${n.donorEmail || "Not provided"}</a></td></tr>
          <tr style="border-top:1px solid #f1f5f9;"><td style="padding:10px 0;color:#64748b;font-size:14px;">Intended Amount</td><td style="padding:10px 0;font-weight:900;color:#B45309;font-size:16px;">$${n.amount.toLocaleString()} USD</td></tr>
        </table>
      </td></tr>

      <!-- Next steps -->
      <tr><td style="padding:0 36px 32px;">
        <div style="background:#FFFBEB;border:1px solid #FDE68A;border-radius:12px;padding:20px 24px;">
          <p style="margin:0 0 12px;font-weight:900;color:#92400E;font-size:14px;">⚡ What to do next</p>
          <ul style="margin:0;padding-left:18px;color:#78350F;font-size:13px;line-height:2;">
            <li>Complete your MTN MoMo API registration at <a href="https://momodeveloper.mtn.com" style="color:#B45309;font-weight:700;">momodeveloper.mtn.com</a></li>
            <li>Once approved, send a payment request to <strong>${n.momoPhone}</strong></li>
            ${n.donorEmail ? `<li>Notify ${n.donorName || "the donor"} at <a href="mailto:${n.donorEmail}" style="color:#B45309;">${n.donorEmail}</a> that the API is live</li>` : ""}
            <li>View all MoMo interests in your <a href="${adminUrl}" style="color:#B45309;font-weight:700;">Admin → MTN MoMo Interests tab</a></li>
          </ul>
        </div>
      </td></tr>

      <!-- CTA -->
      <tr><td style="padding:0 36px 36px;text-align:center;">
        <a href="${adminUrl}" style="display:inline-block;background:#F5C619;color:#061A32;font-weight:900;font-size:14px;padding:14px 32px;border-radius:50px;text-decoration:none;letter-spacing:0.5px;">View MTN MoMo Interests →</a>
      </td></tr>

      <!-- Footer -->
      <tr><td style="background:#f8fafc;padding:20px 36px;border-top:1px solid #e2e8f0;text-align:center;">
        <p style="margin:0;color:#94a3b8;font-size:12px;">Zeal Care · Monrovia, Liberia · info@zealcare.org · +231 886 727 619</p>
        <p style="margin:4px 0 0;color:#94a3b8;font-size:11px;">Automated MTN MoMo interest alert sent to ${notifyEmail}.</p>
      </td></tr>

    </table>
  </td></tr></table>
</body></html>`;
}

export async function sendMomoInterestNotification(interest: MomoInterest): Promise<void> {
  const config = readEmailConfig();
  const transporter = createTransporter();
  if (!transporter) {
    logger.info({ interest }, "Email not configured — MoMo interest notification skipped");
    return;
  }
  const notifyTo = config.notifyEmail || config.smtpUser;
  try {
    await transporter.sendMail({
      from: senderFrom(),
      to: notifyTo,
      subject: `⚡ MTN MoMo Interest: ${interest.donorName || "Anonymous"} — $${interest.amount.toLocaleString()}`,
      html: buildMomoInterestHtml(interest, notifyTo),
    });
    logger.info({ momoPhone: interest.momoPhone, amount: interest.amount }, "MTN MoMo interest notification sent");
  } catch (err) {
    logger.error({ err }, "Failed to send MTN MoMo interest notification");
  }
}

/* ─── MTN MoMo "We're live!" donor notification ─── */
function buildMomoLiveHtml(donorName: string, momoPhone: string, amount: number): string {
  const firstName = (donorName || "Friend").split(" ")[0];
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;"><tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

      <!-- Header -->
      <tr><td style="background:#061A32;padding:28px 36px;text-align:center;">
        <div style="width:52px;height:52px;background:#F5C619;border-radius:50%;display:inline-block;text-align:center;line-height:52px;font-weight:900;font-size:24px;color:#061A32;margin-bottom:12px;">Z</div>
        <p style="margin:0;color:#fff;font-size:22px;font-weight:900;letter-spacing:2px;">ZEAL CARE</p>
        <p style="margin:4px 0 0;color:rgba(255,255,255,0.5);font-size:12px;">Igniting Potential, Inspiring Change</p>
      </td></tr>

      <!-- Hero -->
      <tr><td style="background:linear-gradient(135deg,#B45309,#D97706);padding:36px 36px;text-align:center;">
        <div style="font-size:48px;margin-bottom:12px;">⚡</div>
        <h1 style="margin:0 0 8px;color:#fff;font-size:28px;font-weight:900;">MTN MoMo Pay is Live!</h1>
        <p style="margin:0;color:rgba(255,255,255,0.85);font-size:15px;line-height:1.6;">
          Hi ${firstName}, you registered interest in donating<br/>via MTN Mobile Money. The wait is over!
        </p>
      </td></tr>

      <!-- Body -->
      <tr><td style="padding:36px 36px 24px;">
        <p style="margin:0 0 20px;color:#334155;font-size:15px;line-height:1.7;">
          We're excited to let you know that <strong>MTN MoMo direct payment is now available</strong> on the Zeal Care website. You can now complete your donation of <strong>$${amount.toLocaleString()}</strong> with a single tap — no shortcodes needed.
        </p>

        <!-- How it works -->
        <div style="background:#FFFBEB;border:1px solid #FDE68A;border-radius:12px;padding:20px 24px;margin-bottom:24px;">
          <p style="margin:0 0 12px;font-weight:900;color:#92400E;font-size:14px;">How to complete your donation:</p>
          <table cellpadding="0" cellspacing="0" width="100%">
            <tr><td style="padding:6px 0;color:#78350F;font-size:13px;"><span style="font-weight:900;color:#B45309;margin-right:8px;">1.</span>Visit the Zeal Care website and click "Donate Now"</td></tr>
            <tr><td style="padding:6px 0;color:#78350F;font-size:13px;"><span style="font-weight:900;color:#B45309;margin-right:8px;">2.</span>Select <strong>MTN MoMo</strong> as your payment method</td></tr>
            <tr><td style="padding:6px 0;color:#78350F;font-size:13px;"><span style="font-weight:900;color:#B45309;margin-right:8px;">3.</span>Enter your MoMo number: <span style="font-family:monospace;background:#FEF3C7;padding:2px 8px;border-radius:4px;font-weight:900;">${momoPhone}</span></td></tr>
            <tr><td style="padding:6px 0;color:#78350F;font-size:13px;"><span style="font-weight:900;color:#B45309;margin-right:8px;">4.</span>Approve the payment prompt on your phone — done!</td></tr>
          </table>
        </div>

        <!-- Impact reminder -->
        <div style="background:#f8fafc;border-left:4px solid #F5C619;border-radius:8px;padding:16px 20px;margin-bottom:28px;">
          <p style="margin:0 0 4px;font-weight:700;color:#061A32;font-size:13px;">Your $${amount.toLocaleString()} will:</p>
          <p style="margin:0;color:#475569;font-size:13px;line-height:1.8;">💛 Sponsor a child's full education for a year<br/>📚 Cover school fees, uniforms, books & supplies<br/>🌍 Transform a life in Monrovia, Liberia</p>
        </div>
      </td></tr>

      <!-- CTA -->
      <tr><td style="padding:0 36px 36px;text-align:center;">
        <a href="https://${process.env["REPLIT_DEV_DOMAIN"] ?? "zealcare.org"}/" style="display:inline-block;background:#F5C619;color:#061A32;font-weight:900;font-size:15px;padding:16px 40px;border-radius:50px;text-decoration:none;letter-spacing:0.5px;">Donate Now via MTN MoMo →</a>
        <p style="margin:16px 0 0;color:#94a3b8;font-size:13px;">Thank you for your patience and generosity.</p>
      </td></tr>

      <!-- Footer -->
      <tr><td style="background:#f8fafc;padding:20px 36px;border-top:1px solid #e2e8f0;text-align:center;">
        <p style="margin:0;color:#94a3b8;font-size:12px;">Questions? Email <a href="mailto:info@zealcare.org" style="color:#1A44C0;">info@zealcare.org</a> or call +231 886 727 619</p>
        <p style="margin:4px 0 0;color:#94a3b8;font-size:11px;">Zeal Care · Monrovia, Liberia · Empowering Africa's Future Leaders</p>
      </td></tr>

    </table>
  </td></tr></table>
</body></html>`;
}

export async function sendMomoLiveNotification(donor: {
  donorName: string; donorEmail: string; momoPhone: string; amount: number;
}): Promise<{ sent: boolean; error?: string }> {
  if (!donor.donorEmail) return { sent: false, error: "No email address" };
  const transporter = createTransporter();
  if (!transporter) return { sent: false, error: "Email not configured" };
  try {
    await transporter.sendMail({
      from: senderFrom(),
      to: donor.donorEmail,
      subject: `⚡ MTN MoMo Pay is now live on Zeal Care — complete your $${donor.amount.toLocaleString()} donation!`,
      html: buildMomoLiveHtml(donor.donorName, donor.momoPhone, donor.amount),
    });
    logger.info({ donorEmail: donor.donorEmail }, "MoMo live notification sent");
    return { sent: true };
  } catch (err) {
    logger.error({ err }, "Failed to send MoMo live notification");
    return { sent: false, error: String(err) };
  }
}

/* ─── Exported functions ─── */

export async function sendDonationNotification(notification: DonationNotification): Promise<void> {
  const config = readEmailConfig();
  const transporter = createTransporter();
  if (!transporter) {
    logger.info({ notification }, "Email not configured — donation notification skipped");
    return;
  }
  try {
    const childLabel = notification.childName ? ` — Sponsoring ${notification.childName}` : "";
    await transporter.sendMail({
      from: senderFrom(),
      to: config.notifyEmail || config.smtpUser,
      subject: `💛 New Donation: $${notification.amount.toLocaleString()}${childLabel}`,
      html: buildAdminHtml(notification, config.notifyEmail || config.smtpUser),
    });
    logger.info({ amount: notification.amount }, "Admin donation notification sent");
  } catch (err) {
    logger.error({ err }, "Failed to send admin donation notification");
  }
}

export async function sendThankYouEmail(notification: DonationNotification): Promise<void> {
  if (!notification.donorEmail) return;
  const transporter = createTransporter();
  if (!transporter) return;
  try {
    const childLabel = notification.childName ? ` for sponsoring ${notification.childName}` : "";
    await transporter.sendMail({
      from: senderFrom(),
      to: notification.donorEmail,
      subject: `💛 Thank you${childLabel}, ${notification.donorName || "Friend"}! — Zeal Care`,
      html: buildThankYouHtml(notification),
    });
    logger.info({ donorEmail: notification.donorEmail }, "Thank-you email sent to donor");
  } catch (err) {
    logger.error({ err }, "Failed to send thank-you email");
  }
}

export async function sendWelcomeEmail(email: string, name?: string): Promise<void> {
  const transporter = createTransporter();
  if (!transporter) return;
  try {
    await transporter.sendMail({
      from: senderFrom(),
      to: email,
      subject: "💛 Welcome to the Zeal Care community!",
      html: buildWelcomeHtml(email, name),
    });
    logger.info({ email }, "Welcome email sent to newsletter subscriber");
  } catch (err) {
    logger.error({ err }, "Failed to send welcome email");
  }
}

/* ─── Admin reply to contact message ─── */
export async function sendReplyEmail(opts: {
  to: string; name: string; subject?: string; originalMessage: string; replyText: string;
}): Promise<{ sent: boolean; error?: string }> {
  const transporter = createTransporter();
  if (!transporter) return { sent: false, error: "Email not configured" };
  const firstName = opts.name.split(" ")[0];
  const subjectLine = opts.subject ? `Re: ${opts.subject}` : "Re: Your message to Zeal Care";
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;"><tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
      <tr><td style="background:#061A32;padding:24px 36px;">
        <table width="100%"><tr>
          <td><div style="width:36px;height:36px;background:#F5C619;border-radius:50%;display:inline-block;text-align:center;line-height:36px;font-weight:900;font-size:16px;color:#061A32;vertical-align:middle;margin-right:10px;">Z</div>
          <span style="color:#fff;font-size:18px;font-weight:900;vertical-align:middle;">ZEAL CARE</span></td>
        </tr></table>
      </td></tr>
      <tr><td style="padding:32px 36px;">
        <h2 style="margin:0 0 6px;color:#061A32;font-size:20px;font-weight:900;">Hi ${firstName},</h2>
        <p style="margin:0 0 24px;color:#64748b;font-size:14px;">Thank you for reaching out to Zeal Care. Here is our response to your message.</p>
        <div style="background:#f8fafc;border-left:4px solid #1A44C0;border-radius:8px;padding:20px 24px;margin-bottom:28px;">
          <p style="margin:0;color:#334155;font-size:15px;line-height:1.8;white-space:pre-wrap;">${opts.replyText}</p>
        </div>
        <p style="margin:0 0 24px;color:#64748b;font-size:14px;">If you have further questions, please don't hesitate to reply to this email or contact us below.</p>
        ${opts.originalMessage ? `<div style="background:#f1f5f9;border-radius:8px;padding:16px 20px;">
          <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">Your original message</p>
          <p style="margin:0;color:#94a3b8;font-size:13px;line-height:1.7;white-space:pre-wrap;">${opts.originalMessage}</p>
        </div>` : ""}
      </td></tr>
      <tr><td style="background:#f8fafc;padding:20px 36px;border-top:1px solid #e2e8f0;text-align:center;">
        <p style="margin:0;color:#94a3b8;font-size:12px;">Questions? Reply to this email or call us at +231 886 727 619</p>
        <p style="margin:4px 0 0;color:#94a3b8;font-size:11px;">Zeal Care · Monrovia, Liberia · info@zealcare.org</p>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`;
  try {
    await transporter.sendMail({
      from: senderFrom(),
      to: opts.to,
      subject: subjectLine,
      html,
    });
    return { sent: true };
  } catch (err) {
    return { sent: false, error: String(err) };
  }
}

/* ─── Contact message notification ─── */
export async function sendContactNotification(msg: {
  name: string; email: string; subject?: string; message: string;
}): Promise<void> {
  const config = readEmailConfig();
  const transporter = createTransporter();
  if (!transporter) {
    logger.info({ from: msg.email }, "Email not configured — contact message stored only");
    return;
  }
  const subjectLine = msg.subject ? `"${msg.subject}"` : "a new message";
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;"><tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
      <tr><td style="background:#061A32;padding:24px 36px;">
        <table width="100%"><tr>
          <td><div style="width:36px;height:36px;background:#F5C619;border-radius:50%;display:inline-block;text-align:center;line-height:36px;font-weight:900;font-size:16px;color:#061A32;vertical-align:middle;margin-right:10px;">Z</div>
          <span style="color:#fff;font-size:18px;font-weight:900;vertical-align:middle;">ZEAL CARE</span></td>
          <td align="right"><span style="background:#F5C619;color:#061A32;padding:5px 12px;border-radius:20px;font-size:12px;font-weight:700;">NEW MESSAGE 💬</span></td>
        </tr></table>
      </td></tr>
      <tr><td style="padding:28px 36px;">
        <h2 style="margin:0 0 4px;color:#061A32;font-size:20px;font-weight:900;">Message from ${msg.name}</h2>
        <p style="margin:0 0 24px;color:#64748b;font-size:14px;">via the Zeal Care Contact Form</p>
        <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e2e8f0;">
          <tr><td style="padding:10px 0;color:#64748b;font-size:14px;width:100px;">Name</td><td style="padding:10px 0;font-weight:700;color:#061A32;font-size:14px;">${msg.name}</td></tr>
          <tr style="border-top:1px solid #f1f5f9;"><td style="padding:10px 0;color:#64748b;font-size:14px;">Email</td><td style="padding:10px 0;font-size:14px;"><a href="mailto:${msg.email}" style="color:#1A44C0;font-weight:700;">${msg.email}</a></td></tr>
          ${msg.subject ? `<tr style="border-top:1px solid #f1f5f9;"><td style="padding:10px 0;color:#64748b;font-size:14px;">Subject</td><td style="padding:10px 0;font-weight:700;color:#061A32;font-size:14px;">${msg.subject}</td></tr>` : ""}
        </table>
        <div style="margin-top:20px;background:#f8fafc;border-left:4px solid #F5C619;border-radius:8px;padding:16px 20px;">
          <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">Message</p>
          <p style="margin:0;color:#334155;font-size:14px;line-height:1.7;white-space:pre-wrap;">${msg.message}</p>
        </div>
      </td></tr>
      <tr><td style="padding:0 36px 28px;">
        <a href="mailto:${msg.email}?subject=Re: ${msg.subject ?? "Your message to Zeal Care"}" style="display:inline-block;background:#F5C619;color:#061A32;font-weight:900;font-size:13px;padding:12px 28px;border-radius:50px;text-decoration:none;">Reply to ${msg.name} →</a>
        <p style="margin:12px 0 0;font-size:12px;color:#94a3b8;">Or view it in your <a href="https://${process.env["REPLIT_DEV_DOMAIN"] ?? "your-site"}/admin/messages" style="color:#1A44C0;">Admin → Messages</a></p>
      </td></tr>
      <tr><td style="background:#f8fafc;padding:16px 36px;border-top:1px solid #e2e8f0;text-align:center;">
        <p style="margin:0;color:#94a3b8;font-size:11px;">Automated notification sent to ${config.notifyEmail || config.smtpUser}</p>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`;
  try {
    await transporter.sendMail({
      from: senderFrom(),
      to: config.notifyEmail || config.smtpUser,
      replyTo: msg.email,
      subject: `💬 New Contact: ${msg.name} sent ${subjectLine}`,
      html,
    });
    logger.info({ from: msg.email }, "Contact notification sent");
  } catch (err) {
    logger.error({ err }, "Failed to send contact notification");
  }
}
