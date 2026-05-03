import { join } from "path";

/**
 * Returns the directory used for all JSON data files.
 *
 * - On Vercel (VERCEL=1) the filesystem is read-only except /tmp.
 *   Data stored there is ephemeral and resets on cold-starts.
 *   For true persistence on Vercel, replace these stores with a
 *   database (e.g. Vercel Postgres / Supabase).
 *
 * - On Replit / local dev, uses <cwd>/.data which persists across restarts.
 */
export function getDataDir(): string {
  if (process.env["VERCEL"] === "1") {
    return "/tmp/.zeal-data";
  }
  return join(process.cwd(), ".data");
}
