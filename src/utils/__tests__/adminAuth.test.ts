import { normalizeApiBaseUrl } from "../../lib/adminAuth";

describe("normalizeApiBaseUrl", () => {
  it("keeps a bare Vercel origin", () => {
    expect(
      normalizeApiBaseUrl("https://example.vercel.app")
    ).toBe("https://example.vercel.app");
  });

  it("strips trailing slash", () => {
    expect(
      normalizeApiBaseUrl("https://example.vercel.app/")
    ).toBe("https://example.vercel.app");
  });

  it("strips /api/auth/callback pasted by mistake", () => {
    expect(
      normalizeApiBaseUrl(
        "https://example.vercel.app/api/auth/callback"
      )
    ).toBe("https://example.vercel.app");
  });

  it("strips trailing /api", () => {
    expect(normalizeApiBaseUrl("https://example.vercel.app/api")).toBe(
      "https://example.vercel.app"
    );
  });
});
