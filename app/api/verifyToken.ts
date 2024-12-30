"use server";

import { encodingPswd, verifyPswd } from "@/lib/dealAuth";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import md5 from "crypto-js/md5";

const prisma = new PrismaClient();

export async function verifyToken() {
  const cookie = await cookies();
  if (!cookie.has("token") || !cookie.has("username")) return false;
  const user = await prisma.user.findFirst({
    where: {
      name: cookie.get("username")?.value as string,
    },
    select: {
      name: true,
      pswd: true,
    },
  });
  if (!user) {
    return false;
  }
  const rawToken = md5(user.name + user.pswd + user.name).toString();
  return verifyPswd(
    rawToken,
    encodingPswd(cookie.get("token")?.value as string)
  );
}
