import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const DATA_DIR = join(process.cwd(), ".data");
const FILE = join(DATA_DIR, "contact-messages.json");

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  read: boolean;
  timestamp: string;
};

export function readMessages(): ContactMessage[] {
  try {
    if (!existsSync(FILE)) return [];
    return JSON.parse(readFileSync(FILE, "utf-8")) as ContactMessage[];
  } catch {
    return [];
  }
}

export function appendMessage(data: Omit<ContactMessage, "id" | "read" | "timestamp">): ContactMessage {
  const all = readMessages();
  const entry: ContactMessage = {
    ...data,
    id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    read: false,
    timestamp: new Date().toISOString(),
  };
  all.unshift(entry);
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(FILE, JSON.stringify(all, null, 2), "utf-8");
  return entry;
}

export function markRead(id: string): boolean {
  const all = readMessages();
  const idx = all.findIndex((m) => m.id === id);
  if (idx === -1) return false;
  all[idx].read = true;
  writeFileSync(FILE, JSON.stringify(all, null, 2), "utf-8");
  return true;
}

export function deleteMessage(id: string): boolean {
  const all = readMessages();
  const filtered = all.filter((m) => m.id !== id);
  if (filtered.length === all.length) return false;
  writeFileSync(FILE, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}
