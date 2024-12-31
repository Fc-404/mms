"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function totalMaterials() {
  return await prisma.material.count();
}

export async function totalMaterialsAmount() {
  return await prisma.material.aggregate({
    _sum: {
      amount: true,
    },
  });
}
