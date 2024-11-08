"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"

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

type FormValues = {
  email: string
  password: string
}

function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const mutation = useMutation<any, AxiosError, FormValues>({
    mutationKey: ["login"],
    mutationFn: async (data) => {
      const res = await http.post(`/api/auth/login?source=recruiter`, data)
      return res.data
    },
    onSuccess: () => {
      router.replace("/dashboard")
    },
    onError: (error) => {
      const errorData = error.response?.data as { detail: string }
      toast.error(errorData.detail ?? "Something went wrong")
    },
  })

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="relative w-full max-w-[400px]">
        <Icons.logo className="absolute -top-10 left-1/2 mr-2 h-20 w-20 -translate-x-1/2" />
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
                const baseUrl = `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/api/auth/oauth`
                const params = new URLSearchParams({
                  provider: "Google",
                  returnUrl: encodeURIComponent(
                    "http://localhost:3000/sign-in"
                  ),
                  source: "recruiter", // TODO: this should support candidate as well
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
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault()
              mutation.mutate({ email, password })
            }}
          >
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button className="w-full">Sign in</Button>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="underline">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default SignInPage
