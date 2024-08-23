"use client"

import Link from "next/link"

import { useSession } from "@/components/SessionProvider"

export default function DashboardPage() {
  const session = useSession()
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      Home
      <Link href="/dashboard">Dashboard</Link>
      <br />
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </section>
  )
}
