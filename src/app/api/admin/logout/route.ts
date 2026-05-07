import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, buildSessionCookieAttributes } from "@/lib/admin-auth";

export async function POST() {
  const cookie = buildSessionCookieAttributes({ maxAge: 0 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: cookie.name,
    value: "",
    ...cookie.attributes,
  });
  // Belt-and-braces: also explicitly delete by name in case maxAge=0 is treated differently.
  response.cookies.delete(ADMIN_SESSION_COOKIE);
  return response;
}
