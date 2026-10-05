import type { VercelRequest, VercelResponse } from "@vercel/node";
import { applyCors } from "./_lib/cors";
import { requireSession } from "./_lib/auth";
import {
  mergeProfileUpdate,
  readDataJson,
  writeDataJson,
  type ProfileEditable,
} from "./_lib/github";

// Keep aligned with PORTFOLIO_VISUALS in src/lib/profileTypes.ts.
const PORTFOLIO_VISUALS = ["ads", "crm", "ai", "data"] as const;

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isValidImageSource(src: string): boolean {
  const value = src.trim();
  return (
    /^https?:\/\/\S+$/i.test(value) ||
    (value.startsWith("/") && !value.startsWith("//"))
  );
}

function validateSection(
  value: unknown,
  validateItem: (item: unknown) => boolean
): boolean {
  return (
    isRecord(value) &&
    typeof value.enabled === "boolean" &&
    Array.isArray(value.items) &&
    value.items.every(validateItem)
  );
}

function validateTimelineEntry(item: unknown): boolean {
  return (
    isRecord(item) &&
    typeof item.title === "string" &&
    typeof item.enabled === "boolean"
  );
}

function validatePortfolioItem(item: unknown): boolean {
  if (
    !isRecord(item) ||
    typeof item.enabled !== "boolean" ||
    typeof item.id !== "string" ||
    !item.id.trim() ||
    typeof item.title !== "string" ||
    !item.title.trim() ||
    typeof item.eyebrow !== "string" ||
    typeof item.summary !== "string" ||
    typeof item.description !== "string" ||
    !isStringArray(item.outcomes) ||
    !isStringArray(item.tags)
  ) {
    return false;
  }
  if (
    item.visual !== undefined &&
    !PORTFOLIO_VISUALS.includes(item.visual as (typeof PORTFOLIO_VISUALS)[number])
  ) {
    return false;
  }
  if (item.image !== undefined) {
    if (
      !isRecord(item.image) ||
      typeof item.image.src !== "string" ||
      !isValidImageSource(item.image.src) ||
      typeof item.image.alt !== "string" ||
      !item.image.alt.trim()
    ) {
      return false;
    }
  }
  if (item.visual !== undefined && item.image !== undefined) return false;
  if (
    item.href !== undefined &&
    (typeof item.href !== "string" ||
      !/^https?:\/\/\S+$/i.test(item.href.trim()))
  ) {
    return false;
  }
  if (item.hrefLabel !== undefined && typeof item.hrefLabel !== "string") {
    return false;
  }
  return true;
}

function validatePatch(body: unknown): { patch: ProfileEditable; error?: string } | null {
  if (!isRecord(body)) return null;
  const patch = body as ProfileEditable;
  const allowed = ["techStaff", "experience", "education", "portfolio"];
  if (Object.keys(body).some((key) => !allowed.includes(key))) return null;
  if (patch.techStaff !== undefined && !isStringArray(patch.techStaff)) {
    return { patch, error: "Competenze non valide" };
  }
  if (patch.experience !== undefined && !validateSection(patch.experience, validateTimelineEntry)) {
    return { patch, error: "Esperienze o flag di visibilità non validi" };
  }
  if (patch.education !== undefined && !validateSection(patch.education, validateTimelineEntry)) {
    return { patch, error: "Istruzione o flag di visibilità non validi" };
  }
  if (
    patch.portfolio !== undefined &&
    (!validateSection(patch.portfolio, validatePortfolioItem) ||
      new Set(patch.portfolio.items.map((item) => (item as Record<string, unknown>).id)).size !==
        patch.portfolio.items.length)
  ) {
    return {
      patch,
      error: "Portfolio non valido: controlla titolo, ID univoci e media (visual o immagine, non entrambi)",
    };
  }
  if (
    patch.techStaff === undefined &&
    patch.experience === undefined &&
    patch.education === undefined &&
    patch.portfolio === undefined
  ) {
    return null;
  }
  return { patch };
}

function normalizeSection(value: unknown) {
  const section = Array.isArray(value)
    ? { enabled: true, items: value }
    : isRecord(value)
      ? value
      : { enabled: true, items: [] };
  return {
    enabled: typeof section.enabled === "boolean" ? section.enabled : true,
    items: Array.isArray(section.items)
      ? section.items.map((item) =>
          isRecord(item) && typeof item.enabled !== "boolean"
            ? { ...item, enabled: true }
            : item
        )
      : [],
  };
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (applyCors(req, res)) return;

  try {
    const session = requireSession(req);
    if (!session) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    if (req.method === "GET") {
      const { data } = await readDataJson();
      res.status(200).json({
        techStaff: data.techStaff ?? [],
        experience: normalizeSection(data.experience),
        education: normalizeSection(data.education),
        portfolio: normalizeSection(data.portfolio),
      });
      return;
    }

    if (req.method === "PUT") {
      const validated = validatePatch(req.body);
      if (!validated) {
        res.status(400).json({ error: "Invalid profile payload" });
        return;
      }
      if (validated.error) {
        res.status(422).json({ error: validated.error });
        return;
      }
      const { sha, data } = await readDataJson();
      const merged = mergeProfileUpdate(data, validated.patch);
      await writeDataJson(
        sha,
        merged,
        "chore(profile): update profile content"
      );
      res.status(200).json({
        ok: true,
        techStaff: merged.techStaff ?? [],
        experience: normalizeSection(merged.experience),
        education: normalizeSection(merged.education),
        portfolio: normalizeSection(merged.portfolio),
      });
      return;
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Server error";
    res.status(500).json({ error: message });
  }
}
