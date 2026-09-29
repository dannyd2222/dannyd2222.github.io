import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getEnv } from "./env";

export function getRequestOrigin(req: VercelRequest): string | undefined {
  const origin = req.headers.origin;
  if (typeof origin === "string") return origin;
  return undefined;
}

export function isOriginAllowed(origin: string | undefined): boolean {
  if (!origin) return false;
  const { siteOrigins } = getEnv();
  return siteOrigins.includes(origin);
}

export function applyCors(req: VercelRequest, res: VercelResponse): boolean {
  const origin = getRequestOrigin(req);
  if (origin && isOriginAllowed(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Authorization, Content-Type"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, OPTIONS");
    res.setHeader("Vary", "Origin");
  }
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return true;
  }
  return false;
}
