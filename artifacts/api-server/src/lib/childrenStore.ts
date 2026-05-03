import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { childrenData as SEED, type Child } from "../data/children";

const DATA_DIR = join(process.cwd(), ".data");
const CHILDREN_FILE = join(DATA_DIR, "children.json");
const SPONSORED_FILE = join(DATA_DIR, "sponsored.json");

function ensureDir(): void {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
}

function readSponsored(): Set<string> {
  try {
    if (!existsSync(SPONSORED_FILE)) return new Set();
    return new Set(JSON.parse(readFileSync(SPONSORED_FILE, "utf-8")) as string[]);
  } catch {
    return new Set();
  }
}

export function writeSponsored(ids: Set<string>): void {
  ensureDir();
  writeFileSync(SPONSORED_FILE, JSON.stringify([...ids], null, 2), "utf-8");
}

export function readChildren(): Child[] {
  try {
    if (!existsSync(CHILDREN_FILE)) {
      ensureDir();
      writeFileSync(CHILDREN_FILE, JSON.stringify(SEED, null, 2), "utf-8");
      return SEED.map((c) => ({ ...c }));
    }
    const stored = JSON.parse(readFileSync(CHILDREN_FILE, "utf-8")) as Child[];
    const sponsored = readSponsored();
    return stored.map((c) => ({ ...c, isSponsored: c.isSponsored || sponsored.has(c.id) }));
  } catch {
    return SEED.map((c) => ({ ...c }));
  }
}

export function writeChildren(children: Child[]): void {
  ensureDir();
  writeFileSync(CHILDREN_FILE, JSON.stringify(children, null, 2), "utf-8");
}

export function getChild(id: string): Child | undefined {
  return readChildren().find((c) => c.id === id);
}

export function addChild(child: Child): Child[] {
  const all = readChildren();
  all.push(child);
  writeChildren(all);
  return all;
}

export function updateChild(id: string, updates: Partial<Child>): Child[] {
  const all = readChildren();
  const idx = all.findIndex((c) => c.id === id);
  if (idx === -1) throw new Error("Child not found");
  all[idx] = { ...all[idx], ...updates, id };
  writeChildren(all);
  return all;
}

export function deleteChild(id: string): Child[] {
  const all = readChildren().filter((c) => c.id !== id);
  writeChildren(all);
  return all;
}

export function sponsorChild(id: string): void {
  const sponsored = readSponsored();
  sponsored.add(id);
  writeSponsored(sponsored);
  const all = readChildren();
  const idx = all.findIndex((c) => c.id === id);
  if (idx !== -1) {
    all[idx].isSponsored = true;
    writeChildren(all);
  }
}
