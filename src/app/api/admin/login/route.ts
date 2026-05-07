import { NextResponse } from "next/server";
import {
  buildSessionCookieAttributes,
  signSession,
  verifyPassword,
} from "@/lib/admin-auth";

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 5 * 60 * 1000;
const attempts = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]!.trim();
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || entry.resetAt < now) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_ATTEMPTS) {
    return false;
  }
  entry.count += 1;
  return true;
}

function resetRateLimit(ip: string): void {
  attempts.delete(ip);
}

type LoginBody = { password?: unknown };

export async function POST(request: Request) {
  const ip = getClientIp(request);

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessaie dans quelques minutes." },
      { status: 429 },
    );
  }

  let body: LoginBody;
  try {
    body = (await request.json()) as LoginBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const password = body.password;
  if (typeof password !== "string" || password.length === 0) {
    return NextResponse.json({ error: "Mot de passe requis." }, { status: 400 });
  }

  let isValid = false;
  try {
    isValid = await verifyPassword(password);
  } catch (error) {
    console.error("[api/admin/login] password verification error:", error);
    return NextResponse.json(
      { error: "Configuration serveur incorrecte." },
      { status: 500 },
    );
  }

  if (!isValid) {
    return NextResponse.json({ error: "Mot de passe incorrect." }, { status: 401 });
  }

  resetRateLimit(ip);

  let session: Awaited<ReturnType<typeof signSession>>;
  try {
    session = await signSession();
  } catch (error) {
    console.error("[api/admin/login] failed to sign session:", error);
    return NextResponse.json(
      { error: "Configuration serveur incorrecte." },
      { status: 500 },
    );
  }

  const cookie = buildSessionCookieAttributes({ maxAge: session.maxAge });
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: cookie.name,
    value: session.value,
    ...cookie.attributes,
  });
  return response;
}
