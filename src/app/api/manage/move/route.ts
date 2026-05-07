import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isRequestAuthenticated } from "@/lib/admin-auth";
import { moveVideo, type VideoTag } from "@/lib/r2";

const ALLOWED_TAGS: VideoTag[] = ["motion", "montage"];

type MoveBody = {
  fromKey?: unknown;
  toTag?: unknown;
};

function isValidTag(value: unknown): value is VideoTag {
  return typeof value === "string" && (ALLOWED_TAGS as string[]).includes(value);
}

export async function POST(request: Request) {
  if (!(await isRequestAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: MoveBody;
  try {
    body = (await request.json()) as MoveBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { fromKey, toTag } = body;

  if (typeof fromKey !== "string" || fromKey.trim() === "") {
    return NextResponse.json({ error: "fromKey is required" }, { status: 400 });
  }

  if (!isValidTag(toTag)) {
    return NextResponse.json(
      { error: "toTag must be 'motion' or 'montage'" },
      { status: 400 },
    );
  }

  try {
    const { newKey } = await moveVideo({ fromKey, toTag });
    revalidatePath("/");
    revalidatePath("/admin/manage");
    return NextResponse.json({ ok: true, newKey });
  } catch (error) {
    console.error("[api/manage/move] failed:", error);
    return NextResponse.json({ error: "Failed to move video" }, { status: 500 });
  }
}
