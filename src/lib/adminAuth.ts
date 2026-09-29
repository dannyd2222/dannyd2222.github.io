const TOKEN_KEY = "profile_admin_session";

export function getApiBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_PROFILE_API_URL ?? "";
  return url.replace(/\/$/, "");
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
  const returnUrl = `${siteOrigin}/auth/callback`;
  const params = new URLSearchParams({ returnUrl });
  return `${api}/api/auth/github?${params}`;
}
