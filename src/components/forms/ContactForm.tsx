"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { validateContact, type ContactErrors, type ContactInput } from "@/lib/validation";
import { site } from "@/lib/content";

// Topics a CTA can preselect via ?topic=…; sent with the booking, not shown as a field.
const topics = [
  "general",
  "consultation",
  "digital-twin",
  "robotics",
  "iot",
  "training",
  "oil-gas",
  "manufacturing",
  "smart-buildings",
  "energy",
  "security",
  "logistics",
  "infrastructure",
];

const interests = ["Digital Twin", "Inspection", "Patrol", "Another task", "Not sure"];
const stages = ["Just starting", "Data in many systems", "Data in one place", "Already predicting"];
const slots = ["Tue 10:00", "Tue 14:30", "Wed 11:00", "Thu 09:30"];

const empty: ContactInput = {
  name: "",
  email: "",
  company: "",
  topic: "general",
  message: "",
  phone: "",
  interest: "",
  stage: "",
  slot: "",
};


export function ContactForm() {
  const params = useSearchParams();
  const [values, setValues] = useState<ContactInput>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactInput, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const topicParam = params.get("topic");
  const [appliedTopic, setAppliedTopic] = useState<string | null>(null);
  if (topicParam !== appliedTopic) {
    setAppliedTopic(topicParam);
    if (topicParam && topics.includes(topicParam)) setValues((v) => ({ ...v, topic: topicParam }));
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
    setTouched({ name: true, email: true });
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
      <div className="rounded-xl border border-[#0b6e50]/30 bg-[#e8f5ef] p-6" role="status">
        <CheckCircle2 className="text-[#0b6e50]" aria-hidden="true" />
        <p className="mt-3 text-lg font-semibold text-[#14304f]">Message sent</p>
        <p className="mt-1 text-[#4a5868]">Thanks. Our team will reply to your email shortly.</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-5 font-semibold text-[#0b6e50]">
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

  const input =
    "h-12 w-full rounded-xl border border-[#cfd8e3] bg-white px-4 text-[0.95rem] text-[#14304f] shadow-[inset_0_1px_2px_rgba(20,48,79,0.04)] transition-[border-color,box-shadow] hover:border-[#14304f]/40 focus:border-[#0b6e50] focus:outline-none focus:ring-4 focus:ring-[#0b6e50]/15 aria-[invalid=true]:border-[#c23b3b]";
  const label = "mb-2 flex items-baseline justify-between gap-3 text-[0.85rem] font-semibold text-[#14304f]";
  const group = "border-t border-[#e2e8ef] pt-6 sm:col-span-2";

  // Single-choice pills backed by native radios (keyboard and screen-reader friendly)
  const pills = (k: "interest" | "stage", legend: string, options: string[]) => (
    <fieldset className="sm:col-span-2">
      <legend className="mb-3 text-[0.85rem] font-semibold text-[#14304f]">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o} className="cursor-pointer">
            <input type="radio" name={k} value={o} checked={values[k] === o} onChange={set(k)} className="peer sr-only" />
            <span className="block rounded-full border border-[#cfd8e3] bg-white px-4 py-2 text-[0.88rem] text-[#14304f] transition-all duration-200 hover:-translate-y-px hover:border-[#14304f]/50 peer-checked:border-[#14304f] peer-checked:bg-[#14304f] peer-checked:text-white peer-checked:shadow-[0_8px_18px_-10px_rgba(20,48,79,0.8)] peer-focus-visible:ring-4 peer-focus-visible:ring-[#0b6e50]/20">
              {o}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
      {/* Contact details: four aligned fields */}
      <div>
        <label htmlFor="contact-name" className={label}>
          Name
        </label>
        <input {...field("name")} autoComplete="name" className={input} />
        {err("name")}
      </div>
      <div>
        <label htmlFor="contact-email" className={label}>
          Work email
        </label>
        <input {...field("email")} type="email" autoComplete="email" inputMode="email" className={input} />
        {err("email")}
      </div>
      <div>
        <label htmlFor="contact-company" className={label}>
          Company
        </label>
        <input {...field("company")} autoComplete="organization" className={input} />
      </div>
      <div>
        <label htmlFor="contact-phone" className={label}>
          Phone or WhatsApp <span className="text-[0.78rem] font-normal text-[#4a5868]">(optional)</span>
        </label>
        <input {...field("phone")} type="tel" autoComplete="tel" inputMode="tel" className={input} />
      </div>

      {/* About the operation */}
      <div className={`${group} grid gap-6`}>
        {pills("interest", "What are you looking at?", interests)}
        {pills("stage", "Where are you today?", stages)}
      </div>

      {/* Time */}
      <fieldset className="rounded-2xl border border-[#e2e8ef] p-4 sm:col-span-2 sm:p-5">
        <div className="mb-3.5 flex items-baseline justify-between gap-4">
          <legend className="float-left text-[0.85rem] font-semibold text-[#14304f]">Pick a slot</legend>
          <span className="text-[0.8rem] text-[#4a5868]">Gulf Standard Time</span>
        </div>
        <div className="clear-both grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {slots.map((o) => {
            const [day, time] = o.split(" ");
            return (
              <label key={o} className="cursor-pointer">
                <input type="radio" name="slot" value={o} checked={values.slot === o} onChange={set("slot")} className="peer sr-only" />
                <span className="flex flex-col items-center rounded-xl border border-[#cfd8e3] bg-white px-3 py-3 text-[#14304f] transition-all duration-200 hover:-translate-y-px hover:border-[#14304f]/50 peer-checked:border-[#0b6e50] peer-checked:bg-[#0b6e50] peer-checked:text-white peer-checked:shadow-[0_10px_22px_-12px_rgba(11,110,80,0.9)] peer-focus-visible:ring-4 peer-focus-visible:ring-[#0b6e50]/20">
                  <span className="text-[0.8rem] opacity-70">{day}</span>{" "}
                  <span className="mt-0.5 text-[1.05rem] font-semibold tabular-nums">{time}</span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="group inline-flex h-[3.4rem] items-center justify-center gap-2 rounded-xl bg-[#0b6e50] px-5 text-[1rem] font-semibold text-white shadow-[0_16px_30px_-16px_rgba(11,110,80,0.9)] transition-colors hover:bg-[#095c43] disabled:opacity-70 sm:col-span-2"
      >
        {status === "sending" ? (
          <>
            <Loader2 size={18} className="animate-spin" aria-hidden="true" /> Sending
          </>
        ) : (
          <>
            Book my 30-minute call <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </>
        )}
      </button>
      {status === "error" && (
        <p role="alert" className="rounded-lg bg-[#fdecec] p-4 text-sm text-[#9b2c2c] sm:col-span-2">
          {serverError} You can also email {site.email} or call {site.phone}.
        </p>
      )}
    </form>
  );
}
