/**
 * Vercel Serverless Function entry point.
 *
 * Vercel routes all /api/* requests here (see vercel.json rewrites).
 * This file creates a Vercel-safe Express app that avoids pino-http's
 * worker-thread transport (which is incompatible with serverless runtimes).
 * All route logic is unchanged — only the logger middleware differs.
 */
import express, { type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import router from "../artifacts/api-server/src/routes/index.js";

// Augment Express Request so routes can call req.log.info(...) as normal
declare global {
  namespace Express {
    interface Request {
      log: {
        info: (obj: Record<string, unknown> | string, msg?: string) => void;
        error: (obj: Record<string, unknown> | string, msg?: string) => void;
        warn: (obj: Record<string, unknown> | string, msg?: string) => void;
        debug: (obj: Record<string, unknown> | string, msg?: string) => void;
      };
    }
  }
}

const app = express();

// Lightweight logger middleware — replaces pino-http for Vercel serverless
app.use((req: Request, _res: Response, next: NextFunction) => {
  const fmt = (obj: Record<string, unknown> | string, msg?: string) =>
    `${msg ? msg + " " : ""}${typeof obj === "string" ? obj : JSON.stringify(obj)}`;
  req.log = {
    info:  (obj, msg) => console.log("[INFO]",  fmt(obj, msg)),
    error: (obj, msg) => console.error("[ERROR]", fmt(obj, msg)),
    warn:  (obj, msg) => console.warn("[WARN]",  fmt(obj, msg)),
    debug: (obj, msg) => console.debug("[DEBUG]", fmt(obj, msg)),
  };
  next();
});

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// All existing API routes — children, donations, admin, newsletter, contact, health
app.use("/api", router);

export default app;
