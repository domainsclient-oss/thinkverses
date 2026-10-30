import { validateContact, type ContactInput } from "@/lib/validation";
import { forwardSubmission } from "@/lib/forward";

const str = (v: unknown, max = 4000) => (typeof v === "string" ? v.slice(0, max) : "");

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field.
  if (str(body.website)) return Response.json({ ok: true });

  const input: ContactInput = {
    name: str(body.name, 200),
    email: str(body.email, 200),
    company: str(body.company, 200),
    topic: str(body.topic, 60),
    message: str(body.message),
    phone: str(body.phone, 60),
    interest: str(body.interest, 60),
    stage: str(body.stage, 60),
    slot: str(body.slot, 60),
  };
  const errors = validateContact(input);
  if (Object.keys(errors).length) {
    return Response.json({ error: "Check the highlighted fields.", errors }, { status: 422 });
  }

  const result = await forwardSubmission("contact", input);
  if (!result.ok) return Response.json({ error: result.error }, { status: result.status });
  return Response.json({ ok: true });
}
