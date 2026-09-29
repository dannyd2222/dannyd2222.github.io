function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export function getEnv() {
  return {
    githubClientId: required("GITHUB_CLIENT_ID"),
    githubClientSecret: required("GITHUB_CLIENT_SECRET"),
    githubPat: required("GITHUB_PAT"),
    githubRepo: required("GITHUB_REPO"),
    githubAllowedLogin: required("GITHUB_ALLOWED_LOGIN").toLowerCase(),
    jwtSecret: required("JWT_SECRET"),
    siteOrigins: (process.env.ALLOWED_ORIGINS ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    dataJsonPath: process.env.DATA_JSON_PATH ?? "src/data.json",
    oauthCallbackUrl: required("OAUTH_CALLBACK_URL"),
  };
}
