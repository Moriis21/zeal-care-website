import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const DATA_DIR = join(process.cwd(), ".data");
const FILE = join(DATA_DIR, "newsletter.json");

export type Subscriber = {
  email: string;
  name?: string;
  subscribedAt: string;
};

export function readSubscribers(): Subscriber[] {
  try {
    if (!existsSync(FILE)) return [];
    return JSON.parse(readFileSync(FILE, "utf-8")) as Subscriber[];
  } catch {
    return [];
  }
}

export function addSubscriber(email: string, name?: string): { added: boolean; subscriber: Subscriber } {
  const all = readSubscribers();
  const existing = all.find((s) => s.email.toLowerCase() === email.toLowerCase());
  if (existing) return { added: false, subscriber: existing };
  const subscriber: Subscriber = { email, name, subscribedAt: new Date().toISOString() };
  all.unshift(subscriber);
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(FILE, JSON.stringify(all, null, 2), "utf-8");
  return { added: true, subscriber };
}
