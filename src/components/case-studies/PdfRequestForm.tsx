"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Download, Loader2 } from "lucide-react";
import { validateEmail } from "@/lib/validation";
import { site } from "@/lib/content";

// No PDF file is published yet, so the request goes to the team, who send it by email.
export function PdfRequestForm({ caseStudy }: { caseStudy: string }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [serverError, setServerError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateEmail(email);
    setError(found);
    if (found) {
      document.getElementById("cs-pdf-email")?.focus();
      return;
    }
    setStatus("sending");
    setServerError("");
    try {
      const hp = (e.currentTarget.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
      const local = email.split("@")[0];
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // The contact API needs a name; this form only asks for an email.
          name: local.length >= 2 ? local : "Case study PDF request",
          email,
          company: "",
          topic: "general",
          interest: "",
          phone: "",
          stage: "",
          slot: "",
          message: `Case study PDF request: ${caseStudy}`,
          website: hp,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your request could not be sent.");
      setStatus("sent");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Your request could not be sent.");
    }
  }

  if (status === "sent") {
    return (
      <p role="status" className="flex items-center gap-3 rounded-2xl bg-[#e6f4ee] p-4 font-medium text-[#0b6e50]">
        <CheckCircle2 size={20} aria-hidden="true" className="shrink-0" />
        Thanks. We will email the PDF to you shortly.
      </p>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit}>
      <label htmlFor="cs-pdf-email" className="mb-1.5 block text-[0.82rem] font-semibold text-[#14304f]">
        Work email
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="cs-pdf-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(validateEmail(e.target.value));
          }}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "cs-pdf-email-error" : undefined}
          className="h-12 flex-1 rounded-xl border border-[#d5dde8] bg-[#f7f9fc] px-4 text-[0.95rem] text-[#14304f] transition focus:border-[#0b6e50] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#0b6e50]/15 aria-[invalid=true]:border-[#c23b3b]"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#0b6e50] px-5 font-semibold text-white shadow-[0_14px_30px_-14px_rgba(11,110,80,0.8)] transition-colors hover:bg-[#095c43] disabled:opacity-70"
        >
          {status === "sending" ? (
            <Loader2 size={18} className="animate-spin" aria-hidden="true" />
          ) : (
            <Download size={18} aria-hidden="true" />
          )}
          Download the PDF
        </button>
      </div>
      {error && (
        <p id="cs-pdf-email-error" className="mt-1.5 text-sm text-[#c23b3b]">
          {error}
        </p>
      )}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="cs-pdf-website">Website</label>
        <input id="cs-pdf-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      {status === "error" && (
        <p role="alert" className="mt-3 rounded-lg bg-[#fdecec] p-3 text-sm text-[#9b2c2c]">
          {serverError} You can also email {site.email}.
        </p>
      )}
    </form>
  );
}
