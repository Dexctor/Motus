import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST() {
  revalidatePath("/");
  revalidatePath("/admin/manage");
  revalidatePath("/admin/upload");
  return NextResponse.json({ revalidated: true });
}
