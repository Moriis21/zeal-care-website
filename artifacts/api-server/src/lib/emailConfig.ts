import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { getDataDir } from "./dataDir";

const DATA_DIR = getDataDir();
const CONFIG_FILE = `${DATA_DIR}/email-config.json`;

export type EmailConfig = {
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  notifyEmail: string;
  enabled: boolean;
};

export function readEmailConfig(): EmailConfig {
  try {
    if (existsSync(CONFIG_FILE)) {
      const raw = readFileSync(CONFIG_FILE, "utf-8");
      return JSON.parse(raw) as EmailConfig;
    }
  } catch {}
  return {
    smtpHost: process.env["SMTP_HOST"] ?? "smtp.gmail.com",
    smtpPort: Number(process.env["SMTP_PORT"] ?? 587),
    smtpUser: process.env["SMTP_USER"] ?? "",
    notifyEmail: process.env["NOTIFY_EMAIL"] ?? "",
    enabled: !!(process.env["SMTP_USER"] && process.env["SMTP_PASS"]),
  };
}

export function writeEmailConfig(config: EmailConfig): void {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), "utf-8");
  process.env["SMTP_HOST"] = config.smtpHost;
  process.env["SMTP_PORT"] = String(config.smtpPort);
  process.env["SMTP_USER"] = config.smtpUser;
  process.env["NOTIFY_EMAIL"] = config.notifyEmail;
}
