import { NextRequest } from "next/server"
import axios from "axios"
import { clsx, type ClassValue } from "clsx"
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
