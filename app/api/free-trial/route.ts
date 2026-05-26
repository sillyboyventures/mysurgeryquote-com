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

  if (body._botfield && body._botfield.trim() !== "") {
    return NextResponse.json({ success: true });
  }

  const { name, email, phone, practiceName, practiceType, providers, hearAbout } =
    body;

  if (!name || !email || !practiceName || !practiceType || !providers) {
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
    Phone: phone ?? "",
    "Practice Name": practiceName,
    "Practice Type": practiceType,
    "Surgeons / Providers": providers,
    "How did you hear about us?": hearAbout ?? "",
  };

  try {
    await sendFormEmail({
      subject: `Free Trial Request from ${practiceName}`,
      html: fieldsToHtml(fields),
      text: fieldsToText(fields),
      replyTo: email,
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[api/free-trial]", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
