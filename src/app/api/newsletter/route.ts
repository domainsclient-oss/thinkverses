import { validateEmail } from "@/lib/validation";
import { forwardSubmission } from "@/lib/forward";

export async function POST(request: Request) {
  let email = "";
  try {
    const body = await request.json();
    email = typeof body.email === "string" ? body.email.slice(0, 200).trim() : "";
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const error = validateEmail(email);
  if (error) return Response.json({ error }, { status: 422 });

  const result = await forwardSubmission("newsletter", { email });
  if (!result.ok) return Response.json({ error: result.error }, { status: result.status });
  return Response.json({ ok: true });
}
