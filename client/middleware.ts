import { NextFetchEvent, NextRequest, NextResponse } from "next/server"

export const APP_HOSTNAMES = new Set([
  `app.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
  `preview.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
  "localhost:3000",
  "localhost",
])

export const APP_DOMAIN =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? `https://app.${process.env.NEXT_PUBLIC_APP_DOMAIN}`
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
      ? `https://preview.${process.env.NEXT_PUBLIC_APP_DOMAIN}`
      : "http://localhost:3000"

const parse = (req: NextRequest) => {
  let domain = req.headers.get("host") as string
  domain = domain.replace("www.", "").toLowerCase()

  let path = req.nextUrl.pathname

  const searchParams = req.nextUrl.searchParams.toString()
  const searchParamsString = searchParams.length > 0 ? `?${searchParams}` : ""
  const fullPath = `${path}${searchParamsString}`

  const key = decodeURIComponent(path.split("/")[1])
  const fullKey = decodeURIComponent(path.slice(1))
  return { domain, path, fullPath, key, fullKey, searchParamsString }
}

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

export async function getToken(req: NextRequest): Promise<any> {
  const accessToken = req.cookies.get("access_token")?.value

  if (!accessToken) {
    console.log("Access token not found")
    return null
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/api/auth/session`,
      {
        method: "GET",
        headers: {
          Cookie: `access_token=${accessToken}`,
        },
        credentials: "include",
      }
    )

    if (!res.ok) {
      console.error(`API call failed with status ${res.status}`)
      return null
    }
    const userinfo = await res.json()
    return userinfo
  } catch (error) {
    console.error("Error fetching user info:", error)
    return null
  }
}

async function AppMiddleware(req: NextRequest) {
  const { path, fullPath } = parse(req)
  const userinfo = await getToken(req)
  console.log({ userinfo })
  // If there's no user and the path isn't /sign-in, /sign-up, or the root path, redirect to /sign-in
  if (!userinfo && path !== "/" && path !== "/sign-in" && path !== "/sign-up") {
    return NextResponse.redirect(
      new URL(
        `/sign-in${path === "/" ? "" : `?returnUrl=${encodeURIComponent(fullPath)}`}`,
        req.url
      )
    )
  } else if (userinfo) {
    if (path === "/") {
      return NextResponse.next()
    }

    // Redirect to onboarding if the user is an Owner without a company and isn't on the onboarding page
    if (
      userinfo.role === "Owner" &&
      !userinfo.companyId &&
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

export default async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { domain } = parse(req)

  if (APP_HOSTNAMES.has(domain)) {
    return AppMiddleware(req)
  }
}
