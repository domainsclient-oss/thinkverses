export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type ContactInput = {
  name: string;
  email: string;
  company: string;
  topic: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export function validateContact(v: ContactInput): ContactErrors {
  const e: ContactErrors = {};
  if (v.name.trim().length < 2) e.name = "Enter your full name.";
  if (!v.email.trim()) e.email = "Enter your email address.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "Enter an email address like name@company.com.";
  if (v.message.trim().length < 10) e.message = "Add a few words about what you need (at least 10 characters).";
  if (v.message.length > 4000) e.message = "Keep your message under 4,000 characters.";
  return e;
}

export function validateEmail(email: string) {
  if (!email.trim()) return "Enter your email address.";
  if (!EMAIL_RE.test(email.trim())) return "Enter an email address like name@company.com.";
  return undefined;
}
