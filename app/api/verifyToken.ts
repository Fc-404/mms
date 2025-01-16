"use server";

import { encodingPswd, generateToken, verifyPswd } from "@/lib/dealAuth";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import md5 from "crypto-js/md5";

const prisma = new PrismaClient();

export async function verifyToken(): Promise<boolean> {
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

export async function verifyUser(userinfo: {
  name: string;
  pswdHash: string;
}): Promise<boolean> {
  const user = await prisma.user.findFirst({
    where: {
      name: userinfo.name,
    },
  });
  if (!user) {
    return false;
  }
  if (!verifyPswd(user.pswd, userinfo.pswdHash)) {
    return false;
  }
  const cookie = await cookies();
  cookie.set("token", generateToken(user.name, user.pswd));
  cookie.set("username", user.name);
  return true;
}
