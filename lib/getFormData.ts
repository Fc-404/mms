/**
 * Get form data
 */

import { NextRequest } from "next/server";

export default async function getFormData(
  req: NextRequest | Request
): Promise<FormData> {
  try {
    return await req.formData();
  } catch {
    return new FormData();
  }
}
