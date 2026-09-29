import crypto from "crypto";
import { getEnv } from "./env";

export type SessionPayload = {
  sub: string;
  login: string;
  exp: number;
};

const TTL_SECONDS = 60 * 60 * 12;

function b64url(input: Buffer | string): string {
  const buf = typeof input === "string" ? Buffer.from(input) : input;
  return buf
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function b64urlDecode(input: string): Buffer {
  const pad = 4 - (input.length % 4);
  const normalized =
    input.replace(/-/g, "+").replace(/_/g, "/") +
    (pad === 4 ? "" : "=".repeat(pad));
  return Buffer.from(normalized, "base64");
}

export function signSession(login: string, githubId: string): string {
  const { jwtSecret } = getEnv();
  const header = b64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload: SessionPayload = {
    sub: githubId,
    login: login.toLowerCase(),
    exp: Math.floor(Date.now() / 1000) + TTL_SECONDS,
  };
  const body = b64url(JSON.stringify(payload));
  const sig = crypto
    .createHmac("sha256", jwtSecret)
    .update(`${header}.${body}`)
    .digest();
  return `${header}.${body}.${b64url(sig)}`;
}

export function verifySession(token: string): SessionPayload | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [header, body, sig] = parts;
  const { jwtSecret, githubAllowedLogin } = getEnv();
  const expected = crypto
    .createHmac("sha256", jwtSecret)
    .update(`${header}.${body}`)
    .digest();
  const actual = b64urlDecode(sig);
  if (
    expected.length !== actual.length ||
    !crypto.timingSafeEqual(expected, actual)
  ) {
    return null;
  }
  let payload: SessionPayload;
  try {
    payload = JSON.parse(b64urlDecode(body).toString("utf8")) as SessionPayload;
  } catch {
    return null;
  }
  if (payload.exp < Math.floor(Date.now() / 1000)) return null;
  if (payload.login !== githubAllowedLogin) return null;
  return payload;
}

export function signOAuthState(returnUrl: string): string {
  const { jwtSecret } = getEnv();
  const nonce = crypto.randomBytes(16).toString("hex");
  const payload = {
    returnUrl,
    nonce,
    exp: Math.floor(Date.now() / 1000) + 600,
  };
  const body = b64url(JSON.stringify(payload));
  const sig = b64url(
    crypto.createHmac("sha256", jwtSecret).update(body).digest()
  );
  return `${body}.${sig}`;
}

export function verifyOAuthState(state: string): { returnUrl: string } | null {
  const parts = state.split(".");
  if (parts.length !== 2) return null;
  const [body, sig] = parts;
  const { jwtSecret, siteOrigins } = getEnv();
  const expected = crypto
    .createHmac("sha256", jwtSecret)
    .update(body)
    .digest();
  const actual = b64urlDecode(sig);
  if (
    expected.length !== actual.length ||
    !crypto.timingSafeEqual(expected, actual)
  ) {
    return null;
  }
  let payload: { returnUrl: string; exp: number };
  try {
    payload = JSON.parse(b64urlDecode(body).toString("utf8")) as {
      returnUrl: string;
      exp: number;
    };
  } catch {
    return null;
  }
  if (payload.exp < Math.floor(Date.now() / 1000)) return null;
  try {
    const url = new URL(payload.returnUrl);
    if (!siteOrigins.includes(url.origin)) return null;
    if (!url.pathname.startsWith("/auth/callback")) return null;
  } catch {
    return null;
  }
  return { returnUrl: payload.returnUrl };
}
