"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { signIn } from "next-auth/react"

import { http } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"

function SignInPage() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Card className="relative w-full max-w-[400px]">
        <Icons.logo className="mr-2 h-20 w-20 absolute -top-10 left-1/2 -translate-x-1/2" />
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="space-y-4">
            <Button
              className="w-full text-slate-600"
              variant="outline"
              onClick={() => {
                const baseUrl = `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/api/auth/account/external-login`
                const params = new URLSearchParams({
                  provider: "Google",
                  returnUrl: encodeURIComponent(
                    "http://localhost:3000/sign-in"
                  ),
                })

                window.location.href = `${baseUrl}?${params.toString()}`
              }}
            >
              <Icons.google className="mr-2 h-4 w-4" />
              Login with Google
            </Button>

            <Button
              className="w-full text-slate-600"
              variant="outline"
              onClick={async () => {
                await http.get("/api/users  /protected")
              }}
            >
              <Icons.microsoft className="mr-2 h-4 w-4" />
              Login with Microsoft
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                or
              </span>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>{" "}
            </div>
            <Input id="password" type="password" />
          </div>
          <Button className="w-full">Sign in</Button>
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SignInPage