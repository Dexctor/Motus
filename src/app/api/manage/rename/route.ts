import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { renameVideo } from "@/lib/r2";

type RenameBody = {
  key?: unknown;
  newName?: unknown;
};

export async function POST(request: Request) {
  let body: RenameBody;
  try {
    body = (await request.json()) as RenameBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { key, newName } = body;

  if (typeof key !== "string" || key.trim() === "") {
    return NextResponse.json({ error: "key is required" }, { status: 400 });
  }

  if (typeof newName !== "string" || newName.trim() === "") {
    return NextResponse.json({ error: "newName is required" }, { status: 400 });
  }

  try {
    const { newKey } = await renameVideo({ key, newName });
    revalidatePath("/");
    revalidatePath("/admin/manage");
    return NextResponse.json({ ok: true, newKey });
  } catch (error) {
    console.error("[api/manage/rename] failed:", error);
    return NextResponse.json({ error: "Failed to rename video" }, { status: 500 });
  }
}
