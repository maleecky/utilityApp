import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  console.log("pass from api", password);
  try {
    const response = await bcrypt.hash(password, 10);
    return NextResponse.json(response);
  } catch (error) {
    if (error) throw new Error(error as string);
  }
}
