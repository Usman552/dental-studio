import { todayISO, validateAppointment, type AppointmentInput } from "@/lib/validation";

/**
 * Receives appointment requests.
 *
 * Validation mirrors the client so the endpoint is safe to call directly.
 * To go live, forward `data` to the clinic's inbox or practice-management
 * system (e.g. an email provider such as Resend or Postmark) where marked below.
 */
export async function POST(request: Request) {
  let body: Partial<AppointmentInput>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ message: "Invalid request." }, { status: 400 });
  }

  // The server may be in a different timezone from the visitor, so allow one day of leeway.
  const yesterday = todayISO(new Date(Date.now() - 24 * 60 * 60 * 1000));
  const errors = validateAppointment(body, yesterday);

  if (Object.keys(errors).length > 0) {
    return Response.json({ message: "Please review the highlighted fields.", errors }, { status: 422 });
  }

  const data = {
    name: body.name!.trim(),
    email: body.email!.trim(),
    phone: body.phone!.trim(),
    treatment: body.treatment!,
    date: body.date!,
    message: body.message?.trim() ?? "",
    receivedAt: new Date().toISOString(),
  };

  // Integration point: deliver `data` to the clinic here.
  void data;

  return Response.json({ ok: true }, { status: 201 });
}
