/**
 * Inquiry form schema, shared by the browser (instant feedback) and /api/contact (the real check).
 */
export const INTERESTS = [
  "Solar subscription",
  "Appliances",
  "Partnership",
  "Funding or investment",
  "Donation",
  "Volunteering",
  "Media",
  "Something else",
] as const;

export type Interest = (typeof INTERESTS)[number];

export interface InquiryInput {
  interest: Interest;
  name: string;
  email: string;
  organization: string;
  phone: string;
  message: string;
  /** Honeypot. Real people never see or fill this field. */
  website: string;
}

export type InquiryField = keyof Omit<InquiryInput, "website">;
export type FieldErrors = Partial<Record<InquiryField, string>>;

export const LIMITS = {
  name: 100,
  email: 200,
  organization: 120,
  phone: 40,
  messageMin: 10,
  message: 4000,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+\d][\d\s()-]{5,}$/;

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function validateField(field: InquiryField, raw: string): string | undefined {
  const value = raw.trim();
  switch (field) {
    case "interest":
      return (INTERESTS as readonly string[]).includes(value) ? undefined : "Choose what you'd like to talk about.";
    case "name":
      if (value.length < 2) return "Please enter your name.";
      if (value.length > LIMITS.name) return `Keep it under ${LIMITS.name} characters.`;
      return undefined;
    case "email":
      if (!value) return "Please enter your email.";
      if (value.length > LIMITS.email || !EMAIL_RE.test(value)) return "That email doesn't look right.";
      return undefined;
    case "organization":
      return value.length > LIMITS.organization ? `Keep it under ${LIMITS.organization} characters.` : undefined;
    case "phone":
      if (!value) return undefined;
      if (value.length > LIMITS.phone || !PHONE_RE.test(value)) return "Use digits, spaces and an optional +.";
      return undefined;
    case "message":
      if (value.length < LIMITS.messageMin) return "Tell us a little more (at least 10 characters).";
      if (value.length > LIMITS.message) return `Keep it under ${LIMITS.message} characters.`;
      return undefined;
  }
}

export type ValidationResult = { ok: true; data: InquiryInput } | { ok: false; errors: FieldErrors };

export function validateInquiry(raw: unknown): ValidationResult {
  const source = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const data: InquiryInput = {
    interest: str(source.interest) as Interest,
    name: str(source.name),
    email: str(source.email),
    organization: str(source.organization),
    phone: str(source.phone),
    message: str(source.message),
    website: str(source.website),
  };

  const errors: FieldErrors = {};
  for (const field of ["interest", "name", "email", "organization", "phone", "message"] as const) {
    const error = validateField(field, data[field]);
    if (error) errors[field] = error;
  }

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}
