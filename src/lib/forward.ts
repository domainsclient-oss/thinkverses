// Submissions are forwarded as JSON to FORMS_WEBHOOK_URL (Zapier, Make, a CRM or an email service).
// Without it, development logs the payload and production refuses, so no message is silently lost.
export async function forwardSubmission(kind: "contact" | "newsletter", payload: Record<string, string>) {
  const url = process.env.FORMS_WEBHOOK_URL;
  if (!url) {
    if (process.env.NODE_ENV === "production") {
      return { ok: false as const, status: 503, error: "Online forms are not available right now." };
    }
    console.info(`[${kind}] submission (FORMS_WEBHOOK_URL not set)`, payload);
    return { ok: true as const };
  }
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ kind, submittedAt: new Date().toISOString(), ...payload }),
  });
  if (!res.ok) return { ok: false as const, status: 502, error: "Your submission could not be delivered." };
  return { ok: true as const };
}
