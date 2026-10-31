import { treatments } from "./content";

export type AppointmentInput = {
  name: string;
  email: string;
  phone: string;
  treatment: string;
  date: string;
  message: string;
  consent: boolean;
};

export type AppointmentErrors = Partial<Record<keyof AppointmentInput, string>>;

export const GENERAL_CONSULTATION = "general-consultation";

export const treatmentOptions = [
  { value: GENERAL_CONSULTATION, label: "General consultation" },
  ...treatments.map((t) => ({ value: t.slug, label: t.name })),
];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\-.\s\d]{7,20}$/;

/** Returns today's date as YYYY-MM-DD in the visitor's local time. */
export function todayISO(now = new Date()) {
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

/** Shared by the form (client) and the API route (server). */
export function validateAppointment(
  input: Partial<AppointmentInput>,
  today = todayISO(),
): AppointmentErrors {
  const errors: AppointmentErrors = {};
  const name = input.name?.trim() ?? "";
  const email = input.email?.trim() ?? "";
  const phone = input.phone?.trim() ?? "";
  const message = input.message?.trim() ?? "";

  if (name.length < 2) errors.name = "Please enter your full name.";
  else if (name.length > 80) errors.name = "Please keep your name under 80 characters.";

  if (!email) errors.email = "Please enter your email address.";
  else if (!EMAIL.test(email)) errors.email = "Please enter a valid email, e.g. name@example.com.";

  const digits = phone.replace(/\D/g, "");
  if (!phone) errors.phone = "Please enter a phone number.";
  else if (!PHONE.test(phone) || digits.length < 7)
    errors.phone = "Please enter a valid phone number.";

  if (!input.treatment || !treatmentOptions.some((o) => o.value === input.treatment))
    errors.treatment = "Please choose a treatment.";

  if (!input.date) errors.date = "Please choose a preferred date.";
  else if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date)) errors.date = "Please choose a valid date.";
  else if (input.date < today) errors.date = "Please choose a date from today onwards.";
  else if (new Date(`${input.date}T12:00:00`).getDay() === 0)
    errors.date = "The studio is closed on Sundays. Please choose another day.";

  if (message.length > 1000) errors.message = "Please keep your message under 1000 characters.";

  if (!input.consent) errors.consent = "Please confirm we may contact you about your request.";

  return errors;
}
