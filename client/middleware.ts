import { NextFetchEvent, NextRequest, NextResponse } from "next/server"

import { APP_HOSTNAMES } from "@/lib/constants"
import { verifyJWT } from "@/lib/jwt"
import { parse } from "@/lib/utils"

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /_proxy/ (proxies for third-party services)
     * 4. /_static (inside /public)
     * 5. /_vercel (Vercel internals)
     * 6. Static files (e.g. /favicon.ico, /sitemap.xml, /robots.txt, etc.)
     */
    "/((?!api/|_next/|_proxy/|_static|_vercel|[\\w-]+\\.\\w+).*)",
  ],
}

export async function getTokenPayload(req: NextRequest): Promise<any> {
  const accessToken = req.cookies.get("access-token")?.value

  if (!accessToken) return null

  const data = await verifyJWT(accessToken)
  return data
}

async function AppMiddleware(req: NextRequest) {
  const { path, fullPath } = parse(req)
  const userClaims = await getTokenPayload(req)

  // paths that don't require authentication
  const publicPaths = ["/", "/sign-in", "/sign-up", "/invite"]

  // Redirect unauthenticated users
  if (!userClaims && !publicPaths.includes(path)) {
    const returnUrl =
      path === "/" ? "" : `?returnUrl=${encodeURIComponent(fullPath)}`
    return NextResponse.redirect(new URL(`/sign-in${returnUrl}`, req.url))
  }

  // If user is authenticated
  if (userClaims) {
    // Redirect to onboarding for Owners without a company
    if (
      userClaims.role === "Owner" &&
      !userClaims.companyId &&
      path !== "/onboarding"
    ) {
      return NextResponse.redirect(new URL("/onboarding", req.url))
    }

    // Redirect to dashboard for certain paths
    const restrictedPaths = ["/sign-in", "/sign-up", "/onboarding", "/invite"]
    if (restrictedPaths.includes(path)) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
  }

  return NextResponse.rewrite(req.url)
}

export default async function middleware(
  req: NextRequest,
  _ev: NextFetchEvent
) {
  const { domain } = parse(req)

  if (APP_HOSTNAMES.has(domain)) {
    return AppMiddleware(req)
  }
}
