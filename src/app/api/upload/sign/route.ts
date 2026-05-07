import { NextResponse } from "next/server";
import { getPresignedUploadUrl, type VideoTag } from "@/lib/r2";

const ALLOWED_TAGS: VideoTag[] = ["motion", "montage"];
const MAX_SIZE = 500 * 1024 * 1024;

type SignBody = {
  tag?: unknown;
  filename?: unknown;
  contentType?: unknown;
  size?: unknown;
};

function isValidTag(value: unknown): value is VideoTag {
  return typeof value === "string" && (ALLOWED_TAGS as string[]).includes(value);
}

export async function POST(request: Request) {
  let body: SignBody;
  try {
    body = (await request.json()) as SignBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { tag, filename, contentType, size } = body;

  if (!isValidTag(tag)) {
    return NextResponse.json(
      { error: "tag must be 'motion' or 'montage'" },
      { status: 400 },
    );
  }

  if (typeof filename !== "string" || filename.trim() === "") {
    return NextResponse.json({ error: "filename is required" }, { status: 400 });
  }

  if (typeof contentType !== "string" || !contentType.startsWith("video/")) {
    return NextResponse.json(
      { error: "contentType must be a video/* MIME type" },
      { status: 400 },
    );
  }

  if (typeof size !== "number" || !Number.isFinite(size) || size <= 0) {
    return NextResponse.json({ error: "size must be a positive number" }, { status: 400 });
  }

  if (size > MAX_SIZE) {
    return NextResponse.json(
      { error: `File too large (max ${MAX_SIZE} bytes)` },
      { status: 400 },
    );
  }

  try {
    const result = await getPresignedUploadUrl({ tag, filename, contentType });
    return NextResponse.json(result);
  } catch (error) {
    console.error("[api/upload/sign] failed to create presigned URL:", error);
    return NextResponse.json({ error: "Failed to create upload URL" }, { status: 500 });
  }
}
