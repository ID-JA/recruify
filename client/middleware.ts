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

  // If there's no user and the path isn't /sign-in, /sign-up, or the root path, redirect to /sign-in
  if (
    !userClaims &&
    path !== "/" &&
    path !== "/sign-in" &&
    path !== "/sign-up"
  ) {
    return NextResponse.redirect(
      new URL(
        `/sign-in${path === "/" ? "" : `?returnUrl=${encodeURIComponent(fullPath)}`}`,
        req.url
      )
    )
  } else if (userClaims) {
    if (path === "/") {
      return NextResponse.next()
    }

    // Redirect to onboarding if the user is an Owner without a company and isn't on the onboarding page
    if (
      userClaims.role === "Owner" &&
      !userClaims.companyId &&
      path !== "/onboarding"
    ) {
      return NextResponse.redirect(new URL("/onboarding", req.url))
    } else if (["/sign-in", "/sign-up"].includes(path)) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
  }

  // otherwise, rewrite the path to /app
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
