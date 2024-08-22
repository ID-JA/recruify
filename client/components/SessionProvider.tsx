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

type Session = {
  user: User
}

type SessionContextValue<R extends boolean = false> = R extends true
  ?
      | { session: Session; status: "authenticated" }
      | { session: null; status: "loading" }
  :
      | { session: Session; status: "authenticated" }
      | {
          session: null
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
      session: value.session,
      status: "loading",
    }
  }

  return value
}

export interface SessionProviderProps {
  children: React.ReactNode
  session?: Session | null
}

export function SessionProvider(props: SessionProviderProps) {
  const hasInitialSession = props.session !== undefined

  const [loading, setLoading] = useState(!hasInitialSession)
  const [session, setSession] = React.useState(props.session)
  useEffect(() => {
    const getSession = async () => {
      try {
        const res = await fetch("/api/auth/session")
        const data = await res.json()
        setSession(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getSession()
  }, [])

  const value: any = useMemo(
    () => ({
      session,
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
