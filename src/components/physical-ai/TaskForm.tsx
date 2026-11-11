"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { validateEmail } from "@/lib/validation";
import { site } from "@/lib/content";

type Values = { task: string; site: string; often: string; when: string; email: string };
const empty: Values = { task: "", site: "", often: "", when: "", email: "" };

export function TaskForm() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Partial<Record<"task" | "email", string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const validate = (v: Values) => {
    const e: typeof errors = {};
    if (v.task.trim().length < 3) e.task = "Describe the task in a few words.";
    const em = validateEmail(v.email);
    if (em) e.email = em;
    return e;
  };

  const set = (k: keyof Values) => (e: { target: { value: string } }) => {
    const next = { ...values, [k]: e.target.value };
    setValues(next);
    if (Object.keys(errors).length) setErrors(validate(next));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`pa-task-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    setServerError("");
    try {
      const hp = (e.currentTarget.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
      const local = values.email.split("@")[0] || "Physical AI enquiry";
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // The contact API needs a name; this form does not ask for one.
          name: local.length >= 2 ? local : "Physical AI enquiry",
          email: values.email,
          company: "",
          topic: "robotics",
          interest: "Another task",
          phone: "",
          stage: "",
          slot: "",
          message: [
            "Physical AI: another task.",
            `What is the task? ${values.task}`,
            values.site && `What site? ${values.site}`,
            values.often && `How often? ${values.often}`,
            values.when && `By when? ${values.when}`,
          ]
            .filter(Boolean)
            .join("\n"),
          website: hp,
        }),
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
      <div className="grid min-h-[20rem] place-items-center text-center" role="status">
        <div>
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#e6f4ee] text-[#0b6e50]">
            <CheckCircle2 size={28} aria-hidden="true" />
          </span>
          <p className="mt-4 text-xl font-semibold text-[#14304f]">Task received</p>
          <p className="mt-1 text-[#4b5a74]">Thanks. Our team will check the fit and reply by email.</p>
          <button type="button" onClick={() => setStatus("idle")} className="mt-5 font-semibold text-[#0b6e50] hover:underline">
            Send another task
          </button>
        </div>
      </div>
    );
  }

  const input =
    "h-12 w-full rounded-xl border border-[#d5dde8] bg-[#f7f9fc] px-4 text-[0.95rem] text-[#14304f] transition placeholder:text-[#8a97ab] focus:border-[#0b6e50] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#0b6e50]/15 aria-[invalid=true]:border-[#c23b3b]";
  const label = "mb-1.5 block text-[0.82rem] font-semibold text-[#14304f]";
  const a11y = (k: "task" | "email") => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `pa-task-${k}-error` : undefined,
  });
  const err = (k: "task" | "email") =>
    errors[k] ? (
      <p id={`pa-task-${k}-error`} className="mt-1.5 text-sm text-[#c23b3b]">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-3">
      <div className="sm:col-span-3">
        <label htmlFor="pa-task-task" className={label}>What is the task?</label>
        <input
          id="pa-task-task"
          value={values.task}
          onChange={set("task")}
          placeholder="For example, palletising cartons at the end of line"
          className={input}
          {...a11y("task")}
        />
        {err("task")}
      </div>
      <div>
        <label htmlFor="pa-task-site" className={label}>What site?</label>
        <input id="pa-task-site" value={values.site} onChange={set("site")} className={input} />
      </div>
      <div>
        <label htmlFor="pa-task-often" className={label}>How often?</label>
        <input id="pa-task-often" value={values.often} onChange={set("often")} className={input} />
      </div>
      <div>
        <label htmlFor="pa-task-when" className={label}>By when?</label>
        <input id="pa-task-when" value={values.when} onChange={set("when")} className={input} />
      </div>
      <div className="sm:col-span-3">
        <label htmlFor="pa-task-email" className={label}>Work email</label>
        <input
          id="pa-task-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={values.email}
          onChange={set("email")}
          className={input}
          {...a11y("email")}
        />
        {err("email")}
      </div>

      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="pa-task-website">Website</label>
        <input id="pa-task-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="group mt-1 inline-flex h-[3.4rem] items-center justify-center gap-2 rounded-xl bg-[#0b6e50] px-5 font-semibold text-white shadow-[0_16px_30px_-16px_rgba(11,110,80,0.9)] transition-colors hover:bg-[#095c43] disabled:opacity-70 sm:col-span-3"
      >
        {status === "sending" ? (
          <>
            <Loader2 size={18} className="animate-spin" aria-hidden="true" /> Sending
          </>
        ) : (
          <>
            Tell us your task
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </>
        )}
      </button>
      {status === "error" && (
        <p role="alert" className="rounded-lg bg-[#fdecec] p-4 text-sm text-[#9b2c2c] sm:col-span-3">
          {serverError} You can also email {site.email} or call {site.phone}.
        </p>
      )}
    </form>
  );
}
