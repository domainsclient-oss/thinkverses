"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2, ChevronDown, Loader2 } from "lucide-react";
import { validateContact, type ContactErrors, type ContactInput } from "@/lib/validation";
import { site } from "@/lib/content";

const topics = [
  { value: "general", label: "General enquiry" },
  { value: "consultation", label: "Book a consultation" },
  { value: "digital-twin", label: "Digital Twin solutions" },
  { value: "robotics", label: "Robotics solutions" },
  { value: "iot", label: "IoT and sensor integration" },
  { value: "training", label: "Custom training plan" },
  { value: "oil-gas", label: "Oil & Gas" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "smart-buildings", label: "Smart Buildings & Facilities" },
  { value: "energy", label: "Energy & Utilities" },
  { value: "security", label: "Security Operations" },
  { value: "logistics", label: "Logistics & Supply Chain" },
  { value: "infrastructure", label: "Infrastructure & Industrial Operations" },
];

const empty: ContactInput = { name: "", email: "", company: "", topic: "general", message: "" };

export function ContactForm() {
  const params = useSearchParams();
  const [values, setValues] = useState<ContactInput>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactInput, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const topicParam = params.get("topic");
  // Preselect the topic when a CTA links here with ?topic=…
  const [appliedTopic, setAppliedTopic] = useState<string | null>(null);
  if (topicParam !== appliedTopic) {
    setAppliedTopic(topicParam);
    if (topicParam && topics.some((t) => t.value === topicParam)) {
      setValues((v) => ({ ...v, topic: topicParam }));
    }
  }

  const set = (k: keyof ContactInput) => (e: { target: { value: string } }) => {
    const next = { ...values, [k]: e.target.value };
    setValues(next);
    if (touched[k]) setErrors(validateContact(next));
  };
  const blur = (k: keyof ContactInput) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validateContact(values));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    setTouched({ name: true, email: true, message: true });
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    setServerError("");
    try {
      const hp = (e.currentTarget.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: hp }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your message could not be sent.");
      setStatus("sent");
      setValues(empty);
      setTouched({});
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Your message could not be sent.");
    }
  }

  if (status === "sent") {
    return (
      <div className="mt-8 rounded-2xl border border-cyan/40 bg-cyan/10 p-6" role="status">
        <CheckCircle2 className="text-cyan-deep" aria-hidden="true" />
        <p className="mt-3 text-lg font-semibold">Message sent</p>
        <p className="mt-1 text-slate">Thanks. Our team will reply to your email shortly.</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-5 font-semibold text-volt">
          Send another message
        </button>
      </div>
    );
  }

  const field = (k: keyof ContactInput) => ({
    id: `contact-${k}`,
    name: k,
    value: values[k],
    onChange: set(k),
    onBlur: blur(k),
    "aria-invalid": touched[k] && errors[k] ? true : undefined,
    "aria-describedby": touched[k] && errors[k] ? `contact-${k}-error` : undefined,
  });
  const err = (k: keyof ContactInput) =>
    touched[k] && errors[k] ? (
      <p id={`contact-${k}-error`} className="mt-1.5 text-sm text-[#c23b3b]">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form noValidate onSubmit={onSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium">
          Full name <span className="text-slate">(required)</span>
        </label>
        <input {...field("name")} autoComplete="name" className="field" placeholder="Your name" />
        {err("name")}
      </div>
      <div>
        <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium">
          Work email <span className="text-slate">(required)</span>
        </label>
        <input {...field("email")} type="email" autoComplete="email" inputMode="email" className="field" placeholder="name@company.com" />
        {err("email")}
      </div>
      <div>
        <label htmlFor="contact-company" className="mb-1.5 block text-sm font-medium">
          Company
        </label>
        <input {...field("company")} autoComplete="organization" className="field" placeholder="Company name" />
      </div>
      <div>
        <label htmlFor="contact-topic" className="mb-1.5 block text-sm font-medium">
          What can we help with?
        </label>
        <div className="relative">
        <select {...field("topic")} className="field appearance-none pr-10">
          {topics.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate" aria-hidden="true" />
        </div>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium">
          Message <span className="text-slate">(required)</span>
        </label>
        <textarea {...field("message")} rows={5} className="field resize-y" placeholder="The assets, process or decision you want to improve" />
        {err("message")}
      </div>

      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate">
          Prefer email? Write to{" "}
          <a href={`mailto:${site.email}`} className="font-medium text-ink underline decoration-line underline-offset-4">
            {site.email}
          </a>
        </p>
        <button type="submit" disabled={status === "sending"} className="btn btn-dark disabled:opacity-70">
          {status === "sending" ? (
            <>
              <Loader2 size={18} className="animate-spin" aria-hidden="true" /> Sending
            </>
          ) : (
            <>
              Send message <ArrowRight size={18} aria-hidden="true" />
            </>
          )}
        </button>
      </div>
      {status === "error" && (
        <p role="alert" className="rounded-xl bg-[#fdecec] p-4 text-sm text-[#9b2c2c] sm:col-span-2">
          {serverError} You can also email {site.email} or call {site.phone}.
        </p>
      )}
    </form>
  );
}
