import { NextResponse, type NextRequest } from "next/server"
import { getToken } from "@/middleware"

export async function GET(request: NextRequest) {
  console.log("FROM  API ROUTE")
  const userInfo = await getToken(request)
  return NextResponse.json({
    user: userInfo,
  })
}
