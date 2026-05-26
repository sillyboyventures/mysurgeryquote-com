import { NextResponse } from "next/server";
import {
  clientIp,
  isRateLimited,
  isValidEmail,
  originAllowed,
  fieldsToHtml,
  fieldsToText,
  sendFormEmail,
} from "@/lib/form-submit";

export async function POST(req: Request) {
  if (!originAllowed(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot — pretend success for bots.
  if (body._botfield && body._botfield.trim() !== "") {
    return NextResponse.json({ success: true });
  }

  const { name, email, practiceName, phone, inquiryType, message } = body;

  if (!name || !email || !practiceName || !inquiryType || !message) {
    return NextResponse.json(
      { error: "Please fill in all required fields." },
      { status: 400 },
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  if (isRateLimited(clientIp(req))) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 },
    );
  }

  const fields: Record<string, string> = {
    Name: name,
    Email: email,
    "Practice Name": practiceName,
    Phone: phone ?? "",
    "Inquiry Type": inquiryType,
    Message: message,
  };

  try {
    await sendFormEmail({
      subject: `Contact Form: ${inquiryType} from ${practiceName}`,
      html: fieldsToHtml(fields),
      text: fieldsToText(fields),
      replyTo: email,
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[api/contact]", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
