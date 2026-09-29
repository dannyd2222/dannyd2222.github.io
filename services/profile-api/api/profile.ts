import type { VercelRequest, VercelResponse } from "@vercel/node";
import { applyCors } from "./_lib/cors";
import { requireSession } from "./_lib/auth";
import {
  mergeProfileUpdate,
  readDataJson,
  writeDataJson,
  type ProfileEditable,
} from "./_lib/github";

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
}

function isEntryArray(value: unknown): value is Record<string, unknown>[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as Record<string, unknown>).title === "string"
    )
  );
}

function validatePatch(body: unknown): ProfileEditable | null {
  if (typeof body !== "object" || body === null) return null;
  const patch = body as ProfileEditable;
  if (patch.techStaff !== undefined && !isStringArray(patch.techStaff)) {
    return null;
  }
  if (patch.experience !== undefined && !isEntryArray(patch.experience)) {
    return null;
  }
  if (patch.education !== undefined && !isEntryArray(patch.education)) {
    return null;
  }
  if (
    patch.techStaff === undefined &&
    patch.experience === undefined &&
    patch.education === undefined
  ) {
    return null;
  }
  return patch;
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
        experience: data.experience ?? [],
        education: data.education ?? [],
      });
      return;
    }

    if (req.method === "PUT") {
      const patch = validatePatch(req.body);
      if (!patch) {
        res.status(400).json({ error: "Invalid profile payload" });
        return;
      }
      const { sha, data } = await readDataJson();
      const merged = mergeProfileUpdate(data, patch);
      await writeDataJson(
        sha,
        merged,
        "chore(profile): update skills, experience, or education"
      );
      res.status(200).json({
        ok: true,
        techStaff: merged.techStaff ?? [],
        experience: merged.experience ?? [],
        education: merged.education ?? [],
      });
      return;
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Server error";
    res.status(500).json({ error: message });
  }
}
