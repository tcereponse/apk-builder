/**
 * Runtime validation helpers built on Zod.
 *
 * Use these schemas to validate user input, API payloads, localStorage blobs,
 * URL params, etc. Combine schemas with `.extend` / `.merge` for feature
 * forms.
 */
import { z, type ZodSchema } from "zod";

/** Simplified RFC-5322 email. */
export const emailSchema = z.string().trim().toLowerCase().email().max(254);

/** Min 8 chars, at least 1 uppercase letter and 1 digit. */
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

/** UUID v4. */
export const uuidSchema = z.string().uuid();

/** HTTP(S) URL. */
export const urlSchema = z.string().url();

/** International phone number (digits, +, spaces, dashes, parens). */
export const phoneSchema = z
  .string()
  .trim()
  .regex(/^\+?[\d\s()-]{6,20}$/)
  .refine((v) => v.replace(/\D/g, "").length >= 7, "Phone number is too short");

/** ISO date string (YYYY-MM-DD). */
export const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
  .refine((v) => !Number.isNaN(Date.parse(v)), "Invalid date");

/** Non-empty trimmed string. */
export const nonEmptyStringSchema = z.string().trim().min(1);

/** Positive integer (>= 1). */
export const positiveIntSchema = z.number().int().positive();

/** Non-negative integer (>= 0). */
export const nonNegativeIntSchema = z.number().int().nonnegative();

export type ValidationResult<T> =
  | { success: true; data: T; error: null }
  | { success: false; data: null; error: z.ZodError };

/**
 * Validate data against a Zod schema without throwing.
 * Returns a discriminated union the caller can narrow on.
 */
export function validate<T>(schema: ZodSchema<T>, data: unknown): ValidationResult<T> {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data, error: null };
  }
  return { success: false, data: null, error: result.error };
}

/** Parse data or throw the underlying ZodError. */
export function parseOrThrow<T>(schema: ZodSchema<T>, data: unknown): T {
  return schema.parse(data);
}

/** Convert a ZodError into a flat { field: message } record (first error per field). */
export function zodErrorToRecord(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "_";
    if (!(key in out)) out[key] = issue.message;
  }
  return out;
}
