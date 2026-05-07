import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isRequestAuthenticated } from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!(await isRequestAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidatePath("/");
  revalidatePath("/admin/manage");
  revalidatePath("/admin/upload");
  return NextResponse.json({ revalidated: true });
}
