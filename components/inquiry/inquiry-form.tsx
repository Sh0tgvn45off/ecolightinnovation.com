"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, CircleCheck, LoaderCircle } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  INTERESTS,
  LIMITS,
  validateField,
  type FieldErrors,
  type InquiryField,
  type InquiryInput,
  type Interest,
} from "@/lib/inquiry";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const STEPS: { title: string; fields: InquiryField[] }[] = [
  { title: "What would you like to talk about?", fields: ["interest"] },
  { title: "How can we reach you?", fields: ["name", "email", "organization", "phone"] },
  { title: "Tell us a little more.", fields: ["message"] },
];

const EMPTY: InquiryInput = {
  interest: "" as Interest,
  name: "",
  email: "",
  organization: "",
  phone: "",
  message: "",
  website: "",
};

type Status = { state: "idle" } | { state: "sending" } | { state: "sent" } | { state: "error"; message: string };

const inputBase =
  "w-full rounded-2xl border bg-white/[0.04] px-4 py-3.5 text-[15px] text-white placeholder:text-platinum-dim outline-none transition-[border-color,box-shadow,background-color] duration-200 focus:bg-white/[0.06] focus:ring-4";

function fieldClass(error?: string) {
  return cn(
    inputBase,
    error
      ? "border-red-400/60 focus:border-red-400/80 focus:ring-red-400/15"
      : "border-hairline-strong focus:border-photon-light/70 focus:ring-photon/20",
  );
}

export function InquiryForm({ className }: { className?: string }) {
  const id = useId();
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<InquiryInput>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<InquiryField, boolean>>>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const heading = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  const sent = status.state === "sent";

  // Move focus to the step title (or the thank-you note) so screen readers announce the change.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    heading.current?.focus();
  }, [step, sent]);

  const set = (field: keyof InquiryInput, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (field !== "website" && touched[field]) {
      setErrors((e) => ({ ...e, [field]: validateField(field, value) }));
    }
  };

  const blur = (field: InquiryField) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((e) => ({ ...e, [field]: validateField(field, values[field]) }));
  };

  const validateStep = (index: number) => {
    const stepErrors: FieldErrors = {};
    for (const field of STEPS[index].fields) {
      const error = validateField(field, values[field]);
      if (error) stepErrors[field] = error;
    }
    setErrors((e) => ({ ...e, ...stepErrors }));
    setTouched((t) => ({ ...t, ...Object.fromEntries(STEPS[index].fields.map((f) => [f, true])) }));
    return Object.keys(stepErrors).length === 0;
  };

  const next = () => {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < STEPS.length - 1) return next();
    if (!validateStep(step)) return;

    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; errors?: FieldErrors };
      if (res.ok && data.ok) {
        setStatus({ state: "sent" });
        return;
      }
      if (data.errors) {
        setErrors(data.errors);
        const firstBadStep = STEPS.findIndex((s) => s.fields.some((f) => data.errors?.[f]));
        if (firstBadStep >= 0) setStep(firstBadStep);
      }
      setStatus({ state: "error", message: data.message ?? "Something went wrong. Please try again." });
    } catch {
      setStatus({ state: "error", message: "You seem to be offline. Please check your connection and try again." });
    }
  };

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setTouched({});
    setStep(0);
    setStatus({ state: "idle" });
  };

  const errorId = (field: InquiryField) => `${id}-${field}-error`;
  const describedBy = (field: InquiryField) => (errors[field] ? errorId(field) : undefined);
  const errorText = (field: InquiryField) =>
    errors[field] ? (
      <p id={errorId(field)} className="mt-2 text-sm text-red-300">
        {errors[field]}
      </p>
    ) : null;

  if (status.state === "sent") {
    return (
      <div className={cn("glass rounded-[32px] p-8 text-center md:p-14", className)}>
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="mx-auto grid size-16 place-items-center rounded-full bg-photon/15 text-photon-light"
        >
          <CircleCheck aria-hidden className="size-8" />
        </motion.div>
        <h3 ref={heading} tabIndex={-1} className="mt-6 text-3xl font-semibold tracking-tight text-white outline-none">
          Thank you, {values.name.split(" ")[0]}.
        </h3>
        <p className="mx-auto mt-3 max-w-md text-platinum">
          Your message is on its way. We typically reply within 24–48 hours at {values.email}.
        </p>
        <Button variant="glass" className="mt-8" onClick={reset}>
          Send another message
        </Button>
      </div>
    );
  }

  const sending = status.state === "sending";

  return (
    <form
      noValidate
      onSubmit={submit}
      aria-labelledby={`${id}-title`}
      className={cn("glass relative overflow-hidden rounded-[32px] p-6 sm:p-8 md:p-12", className)}
    >
      {/* Progress */}
      <div className="mb-8 flex items-center gap-4">
        <div className="flex flex-1 gap-1.5" aria-hidden>
          {STEPS.map((_, i) => (
            <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-photon-light"
                initial={false}
                animate={{ width: i <= step ? "100%" : "0%" }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </div>
          ))}
        </div>
        <p className="text-xs text-platinum tabular">
          Step {step + 1} of {STEPS.length}
        </p>
      </div>

      <h3
        id={`${id}-title`}
        ref={heading}
        tabIndex={-1}
        className="text-2xl font-semibold tracking-tight text-white outline-none md:text-3xl"
      >
        {STEPS[step].title}
      </h3>

      <div className="relative mt-8 min-h-[260px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {step === 0 && (
              <fieldset aria-describedby={describedBy("interest")}>
                <legend className="sr-only">Topic</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {INTERESTS.map((interest) => {
                    const checked = values.interest === interest;
                    return (
                      <label
                        key={interest}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-4 text-[15px] transition-all duration-200 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-photon/25",
                          checked
                            ? "border-photon-light/70 bg-photon/10 text-white"
                            : "border-hairline-strong bg-white/[0.03] text-platinum-soft hover:border-white/25 hover:text-white",
                        )}
                      >
                        <input
                          type="radio"
                          name="interest"
                          value={interest}
                          checked={checked}
                          onChange={() => {
                            set("interest", interest);
                            setErrors((e) => ({ ...e, interest: undefined }));
                          }}
                          className="sr-only"
                        />
                        <span
                          aria-hidden
                          className={cn(
                            "grid size-5 shrink-0 place-items-center rounded-full border transition-colors",
                            checked ? "border-photon-light bg-photon-light" : "border-white/30",
                          )}
                        >
                          {checked && <span className="size-2 rounded-full bg-black" />}
                        </span>
                        {interest}
                      </label>
                    );
                  })}
                </div>
                {errorText("interest")}
              </fieldset>
            )}

            {step === 1 && (
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor={`${id}-name`} className="mb-2 block text-sm text-platinum-soft">
                    Full name
                  </label>
                  <input
                    id={`${id}-name`}
                    name="name"
                    autoComplete="name"
                    value={values.name}
                    maxLength={LIMITS.name}
                    onChange={(e) => set("name", e.target.value)}
                    onBlur={() => blur("name")}
                    aria-invalid={!!errors.name}
                    aria-describedby={describedBy("name")}
                    className={fieldClass(errors.name)}
                    placeholder="Your name"
                  />
                  {errorText("name")}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor={`${id}-email`} className="mb-2 block text-sm text-platinum-soft">
                    Email
                  </label>
                  <input
                    id={`${id}-email`}
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={values.email}
                    maxLength={LIMITS.email}
                    onChange={(e) => set("email", e.target.value)}
                    onBlur={() => blur("email")}
                    aria-invalid={!!errors.email}
                    aria-describedby={describedBy("email")}
                    className={fieldClass(errors.email)}
                    placeholder="you@example.com"
                  />
                  {errorText("email")}
                </div>
                <div>
                  <label htmlFor={`${id}-org`} className="mb-2 block text-sm text-platinum-soft">
                    Organisation <span className="text-platinum-dim">(optional)</span>
                  </label>
                  <input
                    id={`${id}-org`}
                    name="organization"
                    autoComplete="organization"
                    value={values.organization}
                    maxLength={LIMITS.organization}
                    onChange={(e) => set("organization", e.target.value)}
                    onBlur={() => blur("organization")}
                    aria-invalid={!!errors.organization}
                    aria-describedby={describedBy("organization")}
                    className={fieldClass(errors.organization)}
                  />
                  {errorText("organization")}
                </div>
                <div>
                  <label htmlFor={`${id}-phone`} className="mb-2 block text-sm text-platinum-soft">
                    Phone or WhatsApp <span className="text-platinum-dim">(optional)</span>
                  </label>
                  <input
                    id={`${id}-phone`}
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={values.phone}
                    maxLength={LIMITS.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    onBlur={() => blur("phone")}
                    aria-invalid={!!errors.phone}
                    aria-describedby={describedBy("phone")}
                    className={fieldClass(errors.phone)}
                    placeholder="+260 …"
                  />
                  {errorText("phone")}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <label htmlFor={`${id}-message`} className="mb-2 block text-sm text-platinum-soft">
                  Message
                </label>
                <textarea
                  id={`${id}-message`}
                  name="message"
                  rows={6}
                  value={values.message}
                  maxLength={LIMITS.message}
                  onChange={(e) => set("message", e.target.value)}
                  onBlur={() => blur("message")}
                  aria-invalid={!!errors.message}
                  aria-describedby={describedBy("message")}
                  className={cn(fieldClass(errors.message), "resize-y")}
                  placeholder="How would you like to work with us?"
                />
                <div className="flex items-start justify-between gap-4">
                  {errorText("message")}
                  <p className="ml-auto mt-2 text-xs text-platinum-dim tabular">
                    {values.message.length}/{LIMITS.message}
                  </p>
                </div>

                {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
                <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label htmlFor={`${id}-website`}>Website</label>
                  <input
                    id={`${id}-website`}
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={values.website}
                    onChange={(e) => set("website", e.target.value)}
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {status.state === "error" && (
        <div role="alert" className="mt-6 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {status.message}{" "}
          <a href={`mailto:${site.email}`} className="font-medium text-white underline underline-offset-2">
            {site.email}
          </a>
        </div>
      )}

      <div className="mt-8 flex items-center justify-between gap-4">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="inline-flex items-center gap-1.5 rounded-full px-2 py-2 text-sm text-platinum transition-colors hover:text-white"
          >
            <ArrowLeft aria-hidden className="size-4" /> Back
          </button>
        ) : (
          <span />
        )}
        <Button type="submit" variant={step === STEPS.length - 1 ? "photon" : "primary"} size="lg" disabled={sending}>
          {sending ? (
            <>
              <LoaderCircle aria-hidden className="size-4 animate-spin" /> Sending…
            </>
          ) : step === STEPS.length - 1 ? (
            "Send message"
          ) : (
            "Continue"
          )}
        </Button>
      </div>
    </form>
  );
}
