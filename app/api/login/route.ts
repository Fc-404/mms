/**
 * Login API
 */

import { PrismaClient } from "@prisma/client";
import { generateToken, verifyPswd } from "@/lib/dealAuth";
import { NextRequest, NextResponse } from "next/server";
import getFormData from "@/lib/getFormData";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const formdata = await getFormData(req);
  const username = formdata.get("username") as string;
  const password = formdata.get("password") as string;
  if (!username || !password) {
    return NextResponse.json(
      { message: "Missing username or password" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findFirst({
    where: {
      name: username,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  if (!verifyPswd(user.pswd, password)) {
    return NextResponse.json({ message: "Invalid password" }, { status: 401 });
  }

  const res = NextResponse.json(
    { message: "Login successful" },
    { status: 200 }
  );
  res.cookies
    .set("token", generateToken(user.name, user.pswd))
    .set("username", user.name);
  return res;
}
