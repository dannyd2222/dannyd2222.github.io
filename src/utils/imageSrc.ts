/**
 * Resolves the final URL for `<img>` / CardMedia.
 * Paths from `public/` (e.g. `/images/foo.jpg`) are returned unchanged.
 * Other absolute URLs are returned unchanged unless optional dimensions trigger legacy resize suffixes.
 */
export function resolveImageSrc(
  imageUrl: string | null | undefined,
  googleWidth?: number,
  googleHeight?: number
): string | null {
  if (!imageUrl) return null;
  if (imageUrl.startsWith("/")) return imageUrl;
  if (isGoogleContentUrl(imageUrl)) {
    if (googleWidth != null && googleHeight != null) {
      return `${imageUrl}=w${googleWidth}-h${googleHeight}-no`;
    }
    if (googleWidth != null) {
      return `${imageUrl}=s${googleWidth}-no`;
    }
    return imageUrl;
  }
  return imageUrl;
}

const GOOGLE_CONTENT_KEY = "googleusercontent";

function isGoogleContentUrl(url: string): boolean {
  return url.includes(GOOGLE_CONTENT_KEY);
}
