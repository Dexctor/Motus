import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE, verifySession } from "@/lib/admin-auth";

const PUBLIC_ADMIN_PATHS = new Set<string>(["/admin/login"]);
const PUBLIC_API_PATHS = new Set<string>(["/api/admin/login"]);

function isProtectedAdminPage(pathname: string): boolean {
  if (!pathname.startsWith("/admin")) return false;
  return !PUBLIC_ADMIN_PATHS.has(pathname);
}

function isProtectedApi(pathname: string): boolean {
  if (PUBLIC_API_PATHS.has(pathname)) return false;
  return (
    pathname.startsWith("/api/upload") ||
    pathname.startsWith("/api/manage") ||
    pathname === "/api/revalidate" ||
    pathname === "/api/admin/logout"
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const isAuthenticated = await verifySession(sessionCookie);

  if (isProtectedAdminPage(pathname)) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/admin/login", request.url);
      if (pathname !== "/admin") {
        loginUrl.searchParams.set("from", pathname);
      }
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  if (isProtectedApi(pathname)) {
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  // Already authenticated visitor lands on /admin/login → push them to manage
  if (pathname === "/admin/login" && isAuthenticated) {
    return NextResponse.redirect(new URL("/admin/manage", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/upload/:path*", "/api/manage/:path*", "/api/admin/:path*", "/api/revalidate"],
};
