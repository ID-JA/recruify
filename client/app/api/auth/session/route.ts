import { NextResponse, type NextRequest } from "next/server"
import { getTokenPayload } from "@/middleware"

export async function GET(request: NextRequest) {
  const userClaims = await getTokenPayload(request)

  if (!userClaims) {
    return NextResponse.json(null)
  }

  return NextResponse.json({
    user: userClaims,
  })
}
