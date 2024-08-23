import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function POST(_request: NextRequest) {
  for (const cookie of cookies().getAll()) {
    cookies().delete(cookie.name)
  }
  return NextResponse.json({})
}
