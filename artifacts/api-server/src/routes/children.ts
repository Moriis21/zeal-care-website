import { Router, type IRouter } from "express";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { childrenData, type Child } from "../data/children";

const router: IRouter = Router();

const DATA_DIR = join(process.cwd(), ".data");
const SPONSORED_FILE = join(DATA_DIR, "sponsored.json");

function readSponsored(): Set<string> {
  try {
    if (!existsSync(SPONSORED_FILE)) return new Set();
    const raw = readFileSync(SPONSORED_FILE, "utf-8");
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

function writeSponsored(ids: Set<string>): void {
  try {
    if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
    writeFileSync(SPONSORED_FILE, JSON.stringify([...ids], null, 2), "utf-8");
  } catch {}
}

function mergeSponsored(children: Child[], sponsored: Set<string>): Child[] {
  return children.map((c) => ({
    ...c,
    isSponsored: c.isSponsored || sponsored.has(c.id),
  }));
}

router.get("/children", (_req, res) => {
  const sponsored = readSponsored();
  const result = mergeSponsored(childrenData, sponsored);
  res.json(result);
});

router.post("/children/:id/sponsor", (req, res) => {
  const { id } = req.params;
  const child = childrenData.find((c) => c.id === id);
  if (!child) {
    res.status(404).json({ error: "Child not found" });
    return;
  }
  const sponsored = readSponsored();
  sponsored.add(id);
  writeSponsored(sponsored);
  req.log.info({ childId: id, childName: child.name }, "Child sponsored");
  res.json({ success: true, childId: id });
});

export default router;
