import { getApiBaseUrl, getStoredToken } from "./adminAuth";
import type { EditableProfile } from "./profileTypes";

async function adminFetch<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const token = getStoredToken();
  if (!token) {
    throw new Error("Sessione non valida. Accedi di nuovo.");
  }
  const res = await fetch(`${getApiBaseUrl()}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  const data = (await res.json().catch(() => ({}))) as T & { error?: string };
  if (!res.ok) {
    throw new Error(
      typeof data.error === "string" ? data.error : `Errore API (${res.status})`
    );
  }
  return data;
}

export async function fetchMe(): Promise<{ authenticated: boolean }> {
  return adminFetch("/api/auth/me");
}

export async function fetchEditableProfile(): Promise<EditableProfile> {
  return adminFetch<EditableProfile>("/api/profile");
}

export async function saveEditableProfile(
  profile: EditableProfile
): Promise<EditableProfile> {
  return adminFetch<EditableProfile>("/api/profile", {
    method: "PUT",
    body: JSON.stringify(profile),
  });
}
