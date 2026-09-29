import { getEnv } from "./env";

type GitHubContentResponse = {
  sha: string;
  content: string;
  encoding: string;
};

export type ProfileEditable = {
  techStaff?: string[];
  experience?: unknown[];
  education?: unknown[];
};

function githubHeaders(): Record<string, string> {
  const { githubPat } = getEnv();
  return {
    Authorization: `Bearer ${githubPat}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "dannyd2222-profile-api",
  };
}

export async function exchangeOAuthCode(code: string): Promise<string> {
  const { githubClientId, githubClientSecret, oauthCallbackUrl } = getEnv();
  const res = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: githubClientId,
      client_secret: githubClientSecret,
      code,
      redirect_uri: oauthCallbackUrl,
    }),
  });
  if (!res.ok) {
    throw new Error(`OAuth token exchange failed (${res.status})`);
  }
  const data = (await res.json()) as { access_token?: string; error?: string };
  if (!data.access_token) {
    throw new Error(data.error ?? "OAuth token missing");
  }
  return data.access_token;
}

export async function fetchGitHubUser(accessToken: string): Promise<{
  id: number;
  login: string;
}> {
  const res = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "dannyd2222-profile-api",
    },
  });
  if (!res.ok) {
    throw new Error(`GitHub user fetch failed (${res.status})`);
  }
  const user = (await res.json()) as { id: number; login: string };
  return user;
}

export async function readDataJson(): Promise<{
  sha: string;
  data: Record<string, unknown>;
}> {
  const { githubRepo, dataJsonPath } = getEnv();
  const [owner, repo] = githubRepo.split("/");
  if (!owner || !repo) {
    throw new Error("GITHUB_REPO must be owner/repo");
  }
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${dataJsonPath}`,
    { headers: githubHeaders() }
  );
  if (!res.ok) {
    throw new Error(`Failed to read ${dataJsonPath} (${res.status})`);
  }
  const file = (await res.json()) as GitHubContentResponse;
  const raw = Buffer.from(file.content, "base64").toString("utf8");
  const data = JSON.parse(raw) as Record<string, unknown>;
  return { sha: file.sha, data };
}

export async function writeDataJson(
  sha: string,
  data: Record<string, unknown>,
  message: string
): Promise<void> {
  const { githubRepo, dataJsonPath } = getEnv();
  const [owner, repo] = githubRepo.split("/");
  if (!owner || !repo) {
    throw new Error("GITHUB_REPO must be owner/repo");
  }
  const content = Buffer.from(JSON.stringify(data, null, 2) + "\n", "utf8").toString(
    "base64"
  );
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${dataJsonPath}`,
    {
      method: "PUT",
      headers: {
        ...githubHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, content, sha }),
    }
  );
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to write ${dataJsonPath} (${res.status}): ${errText}`);
  }
}

export function mergeProfileUpdate(
  current: Record<string, unknown>,
  patch: ProfileEditable
): Record<string, unknown> {
  const next = { ...current };
  if (patch.techStaff !== undefined) {
    next.techStaff = patch.techStaff;
  }
  if (patch.experience !== undefined) {
    next.experience = patch.experience;
  }
  if (patch.education !== undefined) {
    next.education = patch.education;
  }
  return next;
}
