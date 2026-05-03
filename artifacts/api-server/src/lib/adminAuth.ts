import jwt from "jsonwebtoken";
import { type Request, type Response, type NextFunction } from "express";

function getSecret(): string {
  return process.env["ADMIN_JWT_SECRET"] ?? process.env["SESSION_SECRET"] ?? "zeal-care-admin-secret-2024";
}

export function signToken(): string {
  return jwt.sign({ role: "admin" }, getSecret(), { expiresIn: "24h" });
}

export function verifyToken(token: string): boolean {
  try {
    const decoded = jwt.verify(token, getSecret()) as { role?: string };
    return decoded.role === "admin";
  } catch {
    return false;
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const auth = req.headers["authorization"] ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token || !verifyToken(token)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}
