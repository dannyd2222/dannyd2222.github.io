import { resolveImageSrc } from "../imageSrc";

describe("utils > imageSrc", () => {
  describe("resolveImageSrc()", () => {
    const googleUrl = "https://lh3.googleusercontent.com/pw/test-photo-id";

    test("returns null when url is missing", () => {
      expect(resolveImageSrc(null)).toBeNull();
      expect(resolveImageSrc(undefined)).toBeNull();
      expect(resolveImageSrc("")).toBeNull();
    });

    test("local public path is unchanged (no size suffix)", () => {
      expect(resolveImageSrc("/images/profile.jpg", 320)).toBe(
        "/images/profile.jpg"
      );
    });

    test("non-Google absolute URL is unchanged", () => {
      const url = "https://example.com/pic.png";
      expect(resolveImageSrc(url, 100)).toBe(url);
    });

    test("Google URL with width appends =s{width}-no", () => {
      const result = resolveImageSrc(googleUrl, 33);
      expect(result).toBe(`${googleUrl}=s33-no`);
    });

    test("Google URL with width and height appends =w-h-no", () => {
      const result = resolveImageSrc(googleUrl, 33, 53);
      expect(result).toBe(`${googleUrl}=w33-h53-no`);
    });

    test("Google URL without dimensions is unchanged", () => {
      expect(resolveImageSrc(googleUrl)).toBe(googleUrl);
    });
  });
});
