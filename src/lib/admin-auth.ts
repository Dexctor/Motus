import "server-only";

export const ADMIN_SESSION_COOKIE = "motus_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value || value.trim() === "") {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function getAdminPassword(): string {
  return getRequiredEnv("ADMIN_PASSWORD");
}

function getSessionSecret(): string {
  const secret = getRequiredEnv("ADMIN_SESSION_SECRET");
  if (secret.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET must be at least 32 characters");
  }
  return secret;
}

function base64UrlEncode(bytes: Uint8Array): string {
  let str = "";
  for (let i = 0; i < bytes.length; i++) {
    str += String.fromCharCode(bytes[i]);
  }
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(input: string): Uint8Array {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/");
  const padding = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
  const binary = atob(padded + padding);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a[i] ^ b[i];
  }
  return diff === 0;
}

async function getHmacKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(getSessionSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

export async function verifyPassword(input: string): Promise<boolean> {
  const expected = encoder.encode(getAdminPassword());
  const provided = encoder.encode(input);
  return timingSafeEqual(expected, provided);
}

type SessionPayload = {
  iat: number; // issued-at, seconds since epoch
  exp: number; // expiration, seconds since epoch
};

export async function signSession(): Promise<{ value: string; maxAge: number }> {
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = { iat: now, exp: now + SESSION_TTL_SECONDS };
  const payloadJson = JSON.stringify(payload);
  const payloadB64 = base64UrlEncode(encoder.encode(payloadJson));

  const key = await getHmacKey();
  const sigBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(payloadB64));
  const sigB64 = base64UrlEncode(new Uint8Array(sigBuffer));

  return {
    value: `${payloadB64}.${sigB64}`,
    maxAge: SESSION_TTL_SECONDS,
  };
}

export async function verifySession(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payloadB64, sigB64] = parts;

  let payloadBytes: Uint8Array;
  let providedSig: Uint8Array;
  try {
    payloadBytes = base64UrlDecode(payloadB64);
    providedSig = base64UrlDecode(sigB64);
  } catch {
    return false;
  }

  let key: CryptoKey;
  try {
    key = await getHmacKey();
  } catch {
    return false;
  }

  const expectedSigBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(payloadB64));
  const expectedSig = new Uint8Array(expectedSigBuffer);

  if (!timingSafeEqual(expectedSig, providedSig)) return false;

  let payload: SessionPayload;
  try {
    payload = JSON.parse(decoder.decode(payloadBytes)) as SessionPayload;
  } catch {
    return false;
  }

  if (typeof payload.exp !== "number") return false;
  const now = Math.floor(Date.now() / 1000);
  return payload.exp > now;
}

type CookieOptions = {
  maxAge?: number;
  expires?: Date;
};

export async function isRequestAuthenticated(request: Request): Promise<boolean> {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return false;
  // Lightweight cookie parse: split on ';' and find the session cookie
  const parts = cookieHeader.split(";");
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.startsWith(`${ADMIN_SESSION_COOKIE}=`)) {
      const value = trimmed.slice(ADMIN_SESSION_COOKIE.length + 1);
      return verifySession(decodeURIComponent(value));
    }
  }
  return false;
}

export function buildSessionCookieAttributes(options: CookieOptions = {}): {
  name: string;
  attributes: {
    httpOnly: true;
    secure: boolean;
    sameSite: "lax";
    path: "/";
    maxAge?: number;
    expires?: Date;
  };
} {
  return {
    name: ADMIN_SESSION_COOKIE,
    attributes: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      ...(options.maxAge !== undefined ? { maxAge: options.maxAge } : {}),
      ...(options.expires !== undefined ? { expires: options.expires } : {}),
    },
  };
}
