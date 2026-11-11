import { NextResponse } from "next/server";
import { validateInquiry } from "@/lib/inquiry";

export const runtime = "nodejs";

/**
 * Where messages are delivered. Defaults to the Google Apps Script the old site used,
 * so messages keep arriving in the same place. Override with CONTACT_WEBHOOK_URL on Vercel.
 */
const DEFAULT_WEBHOOK =
  "https://script.google.com/macros/s/AKfycbwkGI5pBwpYcAz4toS87WXxREEEqsYvl2h998-LwFt33S1PSH1iPsilQjtLvylEqS7q/exec";

const MAX_BODY_BYTES = 20_000;

function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  // Only accept submissions from our own pages.
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return json({ ok: false, message: "Forbidden." }, 403);
    } catch {
      return json({ ok: false, message: "Forbidden." }, 403);
    }
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return json({ ok: false, message: "That message is too long." }, 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, message: "Invalid request." }, 400);
  }

  const result = validateInquiry(body);
  if (!result.ok) {
    return json({ ok: false, message: "Please check the highlighted fields.", errors: result.errors }, 422);
  }

  const { data } = result;

  // Honeypot filled in: almost certainly a bot. Report success and drop it.
  if (data.website) return json({ ok: true });

  // Same shape the existing Apps Script already handles: { name, email, subject, message }.
  const payload = {
    name: data.name,
    email: data.email,
    subject: `[${data.interest}] ${data.organization || data.name}`.slice(0, 200),
    message: [
      data.message,
      "",
      "—",
      `Interest: ${data.interest}`,
      ...(data.organization ? [`Organisation: ${data.organization}`] : []),
      ...(data.phone ? [`Phone: ${data.phone}`] : []),
      "Sent from the ecolightinnovation.com inquiry form",
    ].join("\n"),
  };

  const webhook = process.env.CONTACT_WEBHOOK_URL || DEFAULT_WEBHOOK;

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Webhook responded with ${res.status}`);
  } catch (error) {
    console.error("[contact] delivery failed:", error);
    return json(
      { ok: false, message: "We couldn't send your message just now. Please email us directly instead." },
      502,
    );
  }

  return json({ ok: true });
}
