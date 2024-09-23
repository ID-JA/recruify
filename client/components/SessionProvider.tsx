/**
 * This code is adapted from the NextAuth.js library.
 * The original implementation can be found at https://github.com/nextauthjs/next-auth
 *
 * The code has been refactored and modified to fit the specific needs of my project.
 *
 * License:
 *
 * The original code is licensed under the MIT License.
 */
"use client"

import React, { useContext, useEffect, useMemo, useState } from "react"

import { User } from "@/lib/types"
import { http } from "@/lib/utils"

type SessionContextValue<R extends boolean = false> = R extends true
  ? { data: User; status: "authenticated" } | { data: null; status: "loading" }
  :
      | { data: User; status: "authenticated" }
      | {
          data: null
          status: "unauthenticated" | "loading"
        }

const SessionContext = React.createContext?.<SessionContextValue | undefined>(
  undefined
)

export function useSession<R extends boolean>(options?: {
  required: R
}): SessionContextValue<R> {
  //@ts-expect-error
  const value: SessionContextValue<R> = useContext(SessionContext)

  const { required } = options ?? {}

  const requiredAndNotLoading = required && value.status === "unauthenticated"
  if (requiredAndNotLoading) {
    return {
      data: value.data,
      status: "loading",
    }
  }

  return value
}

export interface SessionProviderProps {
  children: React.ReactNode
  session?: User | null
}

export async function signOut({ callbackUrl }: { callbackUrl: string }) {
  await fetch("/api/auth/signout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
  window.location.href = callbackUrl
  if (callbackUrl.includes("#")) window.location.reload()
}

export function SessionProvider(props: SessionProviderProps) {
  const hasInitialSession = props.session !== undefined

  const [loading, setLoading] = useState(!hasInitialSession)
  const [session, setSession] = useState(props.session)
  useEffect(() => {
    const getSession = async () => {
      try {
        const res = await http.get("/api/user/info")
        const data = res.data

        setSession(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getSession()
  }, [])
  console.log({ session })
  const value: any = useMemo(
    () => ({
      data: session,
      status: loading
        ? "loading"
        : session
          ? "authenticated"
          : "unauthenticated",
    }),
    [session, loading]
  )

  return (
    <SessionContext.Provider value={value}>
      {props.children}
    </SessionContext.Provider>
  )
}
