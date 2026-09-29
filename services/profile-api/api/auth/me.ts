import type { VercelRequest, VercelResponse } from "@vercel/node";
import { applyCors } from "../_lib/cors";
import { requireSession } from "../_lib/auth";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (applyCors(req, res)) return;

  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const session = requireSession(req);
    if (!session) {
      res.status(401).json({ authenticated: false });
      return;
    }
    res.status(200).json({
      authenticated: true,
      login: session.login,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Server error";
    res.status(500).json({ error: message });
  }
}
