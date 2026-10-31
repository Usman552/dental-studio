"use client";

import { AlertCircle, Check, ChevronDown, LoaderCircle } from "lucide-react";
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import {
  todayISO,
  treatmentOptions,
  validateAppointment,
  type AppointmentErrors,
  type AppointmentInput,
} from "@/lib/validation";
import { gsap } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";
import { SELECT_TREATMENT_EVENT } from "./TreatmentDrawer";

type Status = "idle" | "submitting" | "success" | "error";
type FieldName = keyof AppointmentInput;

const empty: AppointmentInput = {
  name: "",
  email: "",
  phone: "",
  treatment: "",
  date: "",
  message: "",
  consent: false,
};

/** Static demo builds (GitHub Pages) have no server, so submissions are simulated. */
const STATIC_DEMO = process.env.NEXT_PUBLIC_STATIC_DEMO === "true";

const order: FieldName[] = ["name", "email", "phone", "treatment", "date", "message", "consent"];

const control =
  "peer w-full border-0 border-b border-ivory/25 bg-transparent px-0 pb-3 pt-2 text-[1.05rem] text-ivory placeholder:text-ivory/35 transition-colors duration-300 focus:border-champagne focus:outline-none aria-[invalid=true]:border-[#e7a593]";

function Field({
  id,
  label,
  error,
  optional,
  className = "",
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="eyebrow flex justify-between text-ivory/60">
        <span>{label}</span>
        {optional && <span className="normal-case tracking-normal text-ivory/40">Optional</span>}
      </label>
      <div className="relative mt-2">{children}</div>
      <p id={`${id}-error`} role={error ? "alert" : undefined} className="min-h-6 pt-2 text-[0.8rem] text-[#f0b8a8]">
        {error && (
          <span className="flex items-center gap-2">
            <AlertCircle aria-hidden strokeWidth={1.5} className="size-3.5 shrink-0" />
            {error}
          </span>
        )}
      </p>
    </div>
  );
}

export function AppointmentForm() {
  const [values, setValues] = useState<AppointmentInput>(empty);
  const [errors, setErrors] = useState<AppointmentErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [submittedName, setSubmittedName] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  // Dates depend on the visitor's clock, so compute them after mount.
  useEffect(() => {
    if (dateRef.current) dateRef.current.min = todayISO();
  }, [status]);

  // "Request a consultation" from a treatment drawer preselects that treatment.
  useEffect(() => {
    const onSelect = (e: Event) => {
      const slug = (e as CustomEvent<string>).detail;
      if (treatmentOptions.some((o) => o.value === slug)) {
        setValues((v) => ({ ...v, treatment: slug }));
        setErrors((er) => ({ ...er, treatment: undefined }));
      }
    };
    window.addEventListener(SELECT_TREATMENT_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_TREATMENT_EVENT, onSelect);
  }, []);

  useEffect(() => {
    if (status !== "success" || !successRef.current) return;
    successRef.current.focus();
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.fromTo(
        successRef.current.querySelectorAll("[data-success-item]"),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 1.1, ease: "expo.out" },
      );
    }
  }, [status]);

  const update = (name: FieldName, value: string | boolean) => {
    const next = { ...values, [name]: value };
    setValues(next);
    if (touched[name] || errors[name]) {
      setErrors((er) => ({ ...er, [name]: validateAppointment(next)[name] }));
    }
    if (status === "error") setStatus("idle");
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    update(name as FieldName, type === "checkbox" ? (e.target as HTMLInputElement).checked : value);
  };

  const onBlur = (e: { target: { name: string } }) => {
    const name = e.target.name as FieldName;
    setTouched((t) => ({ ...t, [name]: true }));
    // Don't nag about an empty field the visitor merely tabbed past.
    const value = values[name];
    if (value === "" || value === false) return;
    setErrors((er) => ({ ...er, [name]: validateAppointment(values)[name] }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const found = validateAppointment(values);
    setErrors(found);
    setTouched(Object.fromEntries(order.map((k) => [k, true])));

    const firstInvalid = order.find((k) => found[k]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    setServerMessage("");
    if (STATIC_DEMO) {
      await new Promise((r) => setTimeout(r, 900));
      setSubmittedName(values.name.trim().split(/\s+/)[0]);
      setStatus("success");
      return;
    }
    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({}))) as { errors?: AppointmentErrors; message?: string };
      if (res.ok) {
        setSubmittedName(values.name.trim().split(/\s+/)[0]);
        setStatus("success");
        return;
      }
      if (data.errors) setErrors(data.errors);
      setServerMessage(data.message ?? "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setServerMessage("We couldn't reach the studio. Please check your connection and try again.");
      setStatus("error");
    }
  };

  const reset = () => {
    setValues(empty);
    setErrors({});
    setTouched({});
    setStatus("idle");
  };

  const a11y = (name: FieldName) => ({
    id: `appt-${name}`,
    name,
    onBlur,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": `appt-${name}-error`,
  });

  if (status === "success") {
    const treatment = treatmentOptions.find((o) => o.value === values.treatment)?.label;
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="flex min-h-[36rem] flex-col justify-center focus:outline-none">
        <span data-success-item className="flex size-14 items-center justify-center border border-champagne text-champagne">
          <Check strokeWidth={1.25} className="size-6" />
        </span>
        <h3 data-success-item className="display mt-10 text-[clamp(2.8rem,6vw,4.5rem)]">
          Thank you, <em className="text-champagne">{submittedName}.</em>
        </h3>
        <p data-success-item className="mt-6 max-w-md text-[0.98rem] leading-relaxed text-ivory/75">
          Your request{treatment ? ` for ${treatment.toLowerCase()}` : ""} has been received. A member of the studio
          team will be in touch shortly to confirm a time that suits you.
        </p>
        <dl data-success-item className="mt-10 grid max-w-md grid-cols-2 gap-6 border-t border-ivory/15 pt-6 text-sm">
          <div>
            <dt className="eyebrow text-ivory/50">Preferred date</dt>
            <dd className="mt-2 font-serif text-xl">
              {new Date(`${values.date}T12:00:00`).toLocaleDateString(undefined, {
                weekday: "short",
                day: "numeric",
                month: "long",
              })}
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-ivory/50">We&apos;ll contact</dt>
            <dd className="mt-2 break-all font-serif text-xl">{values.email}</dd>
          </div>
        </dl>
        <div data-success-item className="mt-12">
          <Button type="button" variant="outline-light" onClick={reset}>
            Make another request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} aria-labelledby="appt-form-title">
      <p id="appt-form-title" className="eyebrow text-champagne">
        Request an appointment
      </p>
      <p className="mt-3 text-sm text-ivory/55">All fields are required unless marked optional.</p>

      <div className="mt-10 grid gap-x-10 gap-y-4 sm:grid-cols-2">
        <Field id="appt-name" label="Full name" error={errors.name} className="sm:col-span-2">
          <input {...a11y("name")} type="text" autoComplete="name" placeholder="Your name" value={values.name} onChange={onChange} className={control} />
        </Field>

        <Field id="appt-email" label="Email" error={errors.email}>
          <input {...a11y("email")} type="email" autoComplete="email" inputMode="email" placeholder="name@example.com" value={values.email} onChange={onChange} className={control} />
        </Field>

        <Field id="appt-phone" label="Phone" error={errors.phone}>
          <input {...a11y("phone")} type="tel" autoComplete="tel" inputMode="tel" placeholder="+1 555 000 0000" value={values.phone} onChange={onChange} className={control} />
        </Field>

        <Field id="appt-treatment" label="Treatment" error={errors.treatment}>
          <select
            {...a11y("treatment")}
            value={values.treatment}
            onChange={onChange}
            className={`${control} appearance-none bg-espresso pr-8 ${values.treatment ? "" : "text-ivory/35"}`}
          >
            <option value="" disabled>
              Select a treatment
            </option>
            {treatmentOptions.map((o) => (
              <option key={o.value} value={o.value} className="text-ivory">
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown aria-hidden strokeWidth={1.25} className="pointer-events-none absolute right-0 top-3 size-5 text-ivory/60" />
        </Field>

        <Field id="appt-date" label="Preferred date" error={errors.date}>
          <input
            {...a11y("date")}
            type="date"
            ref={dateRef}
            value={values.date}
            onChange={onChange}
            className={`${control} [color-scheme:dark] ${values.date ? "" : "text-ivory/45"}`}
          />
        </Field>

        <Field id="appt-message" label="Message" optional error={errors.message} className="sm:col-span-2">
          <textarea
            {...a11y("message")}
            rows={3}
            maxLength={1000}
            placeholder="Anything you'd like us to know, such as preferred times or questions"
            value={values.message}
            onChange={onChange}
            className={`${control} resize-none`}
          />
        </Field>

        <div className="sm:col-span-2">
          <label htmlFor="appt-consent" className="flex cursor-pointer items-start gap-4 text-sm leading-relaxed text-ivory/70">
            <input
              {...a11y("consent")}
              type="checkbox"
              checked={values.consent}
              onChange={onChange}
              className="peer sr-only"
            />
            <span
              aria-hidden
              className="mt-0.5 flex size-5 shrink-0 items-center justify-center border border-ivory/40 transition-colors peer-checked:border-champagne peer-checked:bg-champagne peer-checked:text-espresso peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-ivory peer-aria-[invalid=true]:border-[#e7a593]"
            >
              {values.consent && <Check strokeWidth={2} className="size-3.5" />}
            </span>
            <span>I agree that Lumière Dental Studio may contact me by phone or email about this request.</span>
          </label>
          <p id="appt-consent-error" role={errors.consent ? "alert" : undefined} className="min-h-6 pt-2 text-[0.8rem] text-[#f0b8a8]">
            {errors.consent && (
              <span className="flex items-center gap-2">
                <AlertCircle aria-hidden strokeWidth={1.5} className="size-3.5 shrink-0" />
                {errors.consent}
              </span>
            )}
          </p>
        </div>
      </div>

      {status === "error" && serverMessage && (
        <div role="alert" className="mt-4 flex items-start gap-3 border border-[#e7a593]/50 bg-[#e7a593]/10 px-4 py-3 text-sm text-[#f0b8a8]">
          <AlertCircle aria-hidden strokeWidth={1.5} className="mt-0.5 size-4 shrink-0" />
          {serverMessage}
        </div>
      )}

      <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          variant="light"
          disabled={status === "submitting"}
          icon={status !== "submitting"}
          className="w-full disabled:cursor-wait disabled:opacity-80 sm:w-auto sm:min-w-64"
        >
          {status === "submitting" ? (
            <span className="flex items-center gap-3">
              <LoaderCircle aria-hidden strokeWidth={1.5} className="size-4 animate-spin" />
              Sending request
            </span>
          ) : (
            "Request appointment"
          )}
        </Button>
        <p className="text-xs leading-relaxed text-ivory/50 sm:max-w-[16rem] sm:text-right">
          {STATIC_DEMO
            ? "Demo site: the form validates fully, but requests are not sent anywhere."
            : "This is a request, not a confirmed booking. Not for dental emergencies."}
        </p>
      </div>
    </form>
  );
}

