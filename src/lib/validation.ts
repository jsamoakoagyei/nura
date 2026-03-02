import { z } from "zod";

/**
 * Sanitize user-provided text by stripping dangerous characters
 * and collapsing excessive whitespace.
 */
export function sanitizeText(input: string): string {
  return input
    .replace(/\0/g, "")                              // strip null bytes
    .replace(/[\x01-\x08\x0B\x0C\x0E-\x1F]/g, "")   // strip control chars (keep \n, \r, \t)
    .replace(/\n{4,}/g, "\n\n\n")                     // collapse excessive newlines
    .trim();
}

// --- Forum post schemas ---

export const postTitleSchema = z
  .string()
  .min(1, "Title is required")
  .max(200, "Title must be 200 characters or fewer")
  .transform(sanitizeText)
  .pipe(z.string().min(1, "Title cannot be empty after trimming"));

export const postContentSchema = z
  .string()
  .min(1, "Content is required")
  .max(10000, "Content must be 10,000 characters or fewer")
  .transform(sanitizeText)
  .pipe(z.string().min(1, "Content cannot be empty after trimming"));

// --- Comment schema ---

export const commentContentSchema = z
  .string()
  .min(1, "Comment is required")
  .max(5000, "Comment must be 5,000 characters or fewer")
  .transform(sanitizeText)
  .pipe(z.string().min(1, "Comment cannot be empty after trimming"));

// --- Profile schemas ---

export const displayNameSchema = z
  .string()
  .max(50, "Display name must be 50 characters or fewer")
  .transform(sanitizeText)
  .optional()
  .or(z.literal(""));

// --- Utility schemas ---

export const uuidSchema = z.string().uuid("Invalid ID format");

// --- Avatar validation ---

const ALLOWED_AVATAR_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "webp"];

export function validateAvatarFile(file: File): string | null {
  if (!file.type.startsWith("image/")) {
    return "Please select an image file.";
  }

  const ext = file.name.split(".").pop()?.toLowerCase();
  if (!ext || !ALLOWED_AVATAR_EXTENSIONS.includes(ext)) {
    return `Allowed file types: ${ALLOWED_AVATAR_EXTENSIONS.join(", ")}`;
  }

  if (file.size > 5 * 1024 * 1024) {
    return "Please select an image under 5MB.";
  }

  return null; // valid
}
