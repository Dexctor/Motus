import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isRequestAuthenticated } from "@/lib/admin-auth";
import { deleteVideo } from "@/lib/r2";

type DeleteBody = {
  key?: unknown;
};

export async function POST(request: Request) {
  if (!(await isRequestAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: DeleteBody;
  try {
    body = (await request.json()) as DeleteBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { key } = body;

  if (typeof key !== "string" || key.trim() === "") {
    return NextResponse.json({ error: "key is required" }, { status: 400 });
  }

  try {
    await deleteVideo(key);
    revalidatePath("/");
    revalidatePath("/admin/manage");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/manage/delete] failed:", error);
    return NextResponse.json({ error: "Failed to delete video" }, { status: 500 });
  }
}
