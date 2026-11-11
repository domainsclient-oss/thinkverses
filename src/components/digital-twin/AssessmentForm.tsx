"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CalendarClock, CheckCircle2, Loader2 } from "lucide-react";
import { validateContact, type ContactErrors, type ContactInput } from "@/lib/validation";
import { site } from "@/lib/content";
import { useCheckResult } from "./checkStore";

const slots = ["Tue 10:00", "Tue 14:30", "Wed 11:00", "Thu 09:30"];

type Values = { name: string; email: string; company: string; plants: string; slot: string };
const empty: Values = { name: "", email: "", company: "", plants: "", slot: "" };

export function AssessmentForm() {
  const check = useCheckResult();
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const toInput = (v: Values): ContactInput => ({
    name: v.name,
    email: v.email,
    company: v.company,
    topic: "digital-twin",
    message: [
      "Maturity assessment call request.",
      v.plants && `Number of plants: ${v.plants}`,
      check && `Two-minute check result: Layer ${check.level} (${check.name})`,
    ]
      .filter(Boolean)
      .join("\n"),
    phone: "",
    interest: "Digital Twin",
    stage: check ? `Layer ${check.level}: ${check.name}` : "",
    slot: v.slot,
  });

  const set = (k: keyof Values) => (e: { target: { value: string } }) => {
    const next = { ...values, [k]: e.target.value };
    setValues(next);
    if (Object.keys(errors).length) setErrors(validateContact(toInput(next)));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateContact(toInput(values));
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`dt-form-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    setServerError("");
    try {
      const hp = (e.currentTarget.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...toInput(values), website: hp }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Your request could not be sent.");
      setStatus("sent");
      setValues(empty);
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Your request could not be sent.");
    }
  }

  if (status === "sent") {
    return (
      <div className="grid min-h-[22rem] place-items-center text-center" role="status">
        <div>
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#e6f4ee] text-[#0b6e50]">
            <CheckCircle2 size={28} aria-hidden="true" />
          </span>
          <p className="mt-4 text-xl font-semibold text-[#14304f]">Request sent</p>
          <p className="mt-1 text-[#4b5a74]">Thanks. Our team will confirm your call by email shortly.</p>
          <button type="button" onClick={() => setStatus("idle")} className="mt-5 font-semibold text-[#0b6e50] hover:underline">
            Book another call
          </button>
        </div>
      </div>
    );
  }

  const input =
    "peer h-12 w-full rounded-xl border border-[#d5dde8] bg-[#f7f9fc] px-4 text-[0.95rem] text-[#14304f] transition focus:border-[#0b6e50] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#0b6e50]/15 aria-[invalid=true]:border-[#c23b3b]";
  const label = "mb-1.5 block text-[0.82rem] font-semibold text-[#14304f]";
  const err = (k: "name" | "email") =>
    errors[k] ? (
      <p id={`dt-form-${k}-error`} className="mt-1.5 text-sm text-[#c23b3b]">
        {errors[k]}
      </p>
    ) : null;
  const a11y = (k: "name" | "email") => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `dt-form-${k}-error` : undefined,
  });

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor="dt-form-name" className={label}>Name</label>
        <input id="dt-form-name" value={values.name} onChange={set("name")} autoComplete="name" className={input} {...a11y("name")} />
        {err("name")}
      </div>
      <div>
        <label htmlFor="dt-form-email" className={label}>Work email</label>
        <input
          id="dt-form-email"
          type="email"
          inputMode="email"
          value={values.email}
          onChange={set("email")}
          autoComplete="email"
          className={input}
          {...a11y("email")}
        />
        {err("email")}
      </div>
      <div>
        <label htmlFor="dt-form-company" className={label}>Company</label>
        <input id="dt-form-company" value={values.company} onChange={set("company")} autoComplete="organization" className={input} />
      </div>
      <div>
        <label htmlFor="dt-form-plants" className={label}>Number of plants</label>
        <input
          id="dt-form-plants"
          inputMode="numeric"
          value={values.plants}
          onChange={set("plants")}
          className={input}
        />
      </div>

      <p className="flex items-center gap-2 rounded-xl bg-[#e6f4ee] px-3.5 py-2.5 text-[0.85rem] text-[#0b6e50] sm:col-span-2" aria-live="polite">
        <CheckCircle2 size={16} aria-hidden="true" className="shrink-0" />
        {check ? (
          <span>
            Your check result (<strong>Layer {check.level}</strong>) is added automatically.
          </span>
        ) : (
          <span>
            Take the <a href="#two-minute-check" className="font-semibold underline">two-minute check</a> and your result is added automatically.
          </span>
        )}
      </p>

      <fieldset className="sm:col-span-2">
        <legend className="mb-2.5 flex w-full items-center gap-2 text-[0.82rem] font-semibold text-[#14304f]">
          <CalendarClock size={15} className="text-[#0b6e50]" aria-hidden="true" /> Pick a slot
          <span className="ml-auto font-normal text-[#4b5a74]">Gulf Standard Time</span>
        </legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {slots.map((o) => {
            const [day, time] = o.split(" ");
            return (
              <label key={o} className="cursor-pointer">
                <input type="radio" name="slot" value={o} checked={values.slot === o} onChange={set("slot")} className="peer sr-only" />
                <span className="flex flex-col items-center rounded-xl border border-[#d5dde8] bg-white py-2.5 text-[#14304f] transition-all duration-200 hover:-translate-y-px hover:border-[#0b6e50]/50 peer-checked:border-transparent peer-checked:bg-gradient-to-br peer-checked:from-[#0b6e50] peer-checked:to-[#14946a] peer-checked:text-white peer-checked:shadow-[0_10px_22px_-12px_rgba(11,110,80,0.9)] peer-focus-visible:ring-4 peer-focus-visible:ring-[#0b6e50]/20">
                  <span className="text-[0.72rem] uppercase tracking-wider opacity-70">{day}</span>
                  <span className="text-[1.02rem] font-semibold tabular-nums">{time}</span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="dt-form-website">Website</label>
        <input id="dt-form-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="group mt-1 inline-flex h-[3.4rem] items-center justify-center gap-2 rounded-xl bg-[#0b6e50] px-5 font-semibold text-white shadow-[0_16px_30px_-16px_rgba(11,110,80,0.9)] transition-colors hover:bg-[#095c43] disabled:opacity-70 sm:col-span-2"
      >
        {status === "sending" ? (
          <>
            <Loader2 size={18} className="animate-spin" aria-hidden="true" /> Sending
          </>
        ) : (
          <>
            Book my assessment call
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
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
