import { NextRequest } from "next/server"
import axios from "axios"
import { clsx, type ClassValue } from "clsx"
import ms from "ms"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_BACKEND_URL,
  withCredentials: true,
})

export const parse = (req: NextRequest) => {
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

export function clientAccessCheck({
  action,
  userPermissions,
}: {
  action: string
  userPermissions: any
}) {
  const isAllowed = userPermissions?.find(
    (p: any) => p.permission === action
  )?.isAllowed

  if (isAllowed) {
    return {
      error: false,
    }
  }

  return {
    error: true,
  }
}

export const timeAgo = (
  timestamp: Date | null,
  {
    withAgo,
  }: {
    withAgo?: boolean
  } = {}
): string => {
  if (!timestamp) return "Never"
  const diff = Date.now() - new Date(timestamp).getTime()
  if (diff < 1000) {
    // less than 1 second
    return "Just now"
  } else if (diff > 82800000) {
    // more than 23 hours – similar to how Twitter displays timestamps
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year:
        new Date(timestamp).getFullYear() !== new Date().getFullYear()
          ? "numeric"
          : undefined,
    })
  }
  return `${ms(diff)}${withAgo ? " ago" : ""}`
}
