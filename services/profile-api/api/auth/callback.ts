import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getEnv } from "../_lib/env";
import { signSession, verifyOAuthState } from "../_lib/jwt";
import { exchangeOAuthCode, fetchGitHubUser } from "../_lib/github";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const code = typeof req.query.code === "string" ? req.query.code : "";
  const state = typeof req.query.state === "string" ? req.query.state : "";
  if (!code || !state) {
    res.status(400).send("Missing OAuth parameters");
    return;
  }

  try {
    const statePayload = verifyOAuthState(state);
    if (!statePayload) {
      res.status(400).send("Invalid or expired OAuth state");
      return;
    }

    const accessToken = await exchangeOAuthCode(code);
    const user = await fetchGitHubUser(accessToken);
    const { githubAllowedLogin } = getEnv();

    if (user.login.toLowerCase() !== githubAllowedLogin) {
      const denied = new URL(statePayload.returnUrl);
      denied.searchParams.set("error", "not_allowed");
      res.redirect(302, denied.toString());
      return;
    }

    const session = signSession(user.login, String(user.id));
    const success = new URL(statePayload.returnUrl);
    success.hash = `token=${encodeURIComponent(session)}`;
    res.redirect(302, success.toString());
  } catch (e) {
    const message = e instanceof Error ? e.message : "OAuth failed";
    res.status(500).send(message);
  }
}
