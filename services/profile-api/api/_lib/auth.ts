import type { VercelRequest } from "@vercel/node";
import { verifySession } from "./jwt";

export function bearerToken(req: VercelRequest): string | null {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return null;
  return header.slice("Bearer ".length).trim() || null;
}

export function requireSession(req: VercelRequest) {
  const token = bearerToken(req);
  if (!token) return null;
  return verifySession(token);
}
