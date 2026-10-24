"use client";

import { useId, useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { validateEmail } from "@/lib/validation";

export function NewsletterForm() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const v = validateEmail(email);
    setError(v);
    if (v) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Subscription failed. Try again in a moment.");
      setStatus("done");
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Subscription failed. Try again in a moment.");
    }
  }

  if (status === "done") {
    return (
      <p role="status" className="rounded-full border border-cyan/40 bg-cyan/10 px-5 py-3 text-[0.95rem] text-cyan">
        Subscribed. Look out for our next article.
      </p>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit}>
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id={id}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(validateEmail(e.target.value));
          }}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-err` : undefined}
          placeholder="name@company.com"
          className="field !rounded-full !border-white/15 !bg-white/5 !text-white placeholder:!text-white/40 focus:!border-cyan"
        />
        <button type="submit" disabled={status === "sending"} className="btn btn-primary shrink-0">
          {status === "sending" ? <Loader2 size={18} className="animate-spin" aria-label="Subscribing" /> : "Subscribe"}
        </button>
      </div>
      {error && (
        <p id={`${id}-err`} className="mt-2 pl-4 text-sm text-[#ff9a9a]">
          {error}
        </p>
      )}
    </form>
  );
}
