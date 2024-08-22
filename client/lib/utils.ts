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

// http.defaults.maxRedirects = 0 // Set to 0 to prevent automatic redirects
// http.interceptors.response.use(
//   (response) => {
//     console.log({ response })
//     return response
//   },
//   (error) => {
//     console.log({ error })
//     if (error.response && [301, 302].includes(error.response.status)) {
//       const redirectUrl = error.response.headers.location
//       console.log({ redirectUrl })
//       return http.get(redirectUrl)
//     }
//     return Promise.reject(error)
//   }
// )
