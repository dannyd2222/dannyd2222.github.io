import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getEnv } from "../_lib/env";
import { signOAuthState } from "../_lib/jwt";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const returnUrl =
      typeof req.query.returnUrl === "string" ? req.query.returnUrl : "";
    if (!returnUrl) {
      res.status(400).json({ error: "Missing returnUrl" });
      return;
    }

    const { githubClientId, oauthCallbackUrl } = getEnv();
    const state = signOAuthState(returnUrl);
    const params = new URLSearchParams({
      client_id: githubClientId,
      redirect_uri: oauthCallbackUrl,
      scope: "read:user",
      state,
    });
    res.redirect(302, `https://github.com/login/oauth/authorize?${params}`);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Configuration error";
    res.status(500).json({ error: message });
  }
}
