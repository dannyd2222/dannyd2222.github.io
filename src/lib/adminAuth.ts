const TOKEN_KEY = "profile_admin_session";

/**
 * Origin of the Vercel API, e.g. https://project.vercel.app
 * Strips trailing slash and accidental /api or /api/auth/callback suffixes.
 */
export function normalizeApiBaseUrl(raw: string): string {
  let url = raw.trim().replace(/\/+$/, "");
  url = url.replace(/\/api\/auth\/callback$/i, "");
  url = url.replace(/\/api$/i, "");
  return url.replace(/\/+$/, "");
}

export function getApiBaseUrl(): string {
  return normalizeApiBaseUrl(process.env.NEXT_PUBLIC_PROFILE_API_URL ?? "");
}

export function isAdminApiConfigured(): boolean {
  return getApiBaseUrl().length > 0;
}

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(TOKEN_KEY);
}

export function storeToken(token: string): void {
  sessionStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  sessionStorage.removeItem(TOKEN_KEY);
}

export function buildOAuthStartUrl(siteOrigin: string): string {
  const api = getApiBaseUrl();
  const returnUrl = `${siteOrigin.replace(/\/+$/, "")}/auth/callback`;
  const params = new URLSearchParams({ returnUrl });
  return `${api}/api/auth/github?${params}`;
}
