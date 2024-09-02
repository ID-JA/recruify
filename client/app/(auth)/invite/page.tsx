"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { http } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Icons } from "@/components/icons"

const validateInvite = async ({ token }: { token: string }) => {
  const res = await http.get(`/api/companies/invite/validate?token=${token}`)
  return res.data
}

const schema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  token: z.string().min(1),
})

type FormValues = z.infer<typeof schema>

export default function InvitePage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const { isLoading, isError, isSuccess, data } = useQuery<any, AxiosError>({
    queryKey: ["validate-invite"],
    queryFn: async () =>
      await validateInvite({
        token: searchParams.get("token") ?? "",
      }),
    retry: false,
    refetchOnWindowFocus: false,
  })

  const mutation = useMutation<any, AxiosError, FormValues>({
    mutationKey: ["accept-invite"],
    mutationFn: async (data) => {
      const res = await http.post(`/api/companies/invite/accept`, data)
      return res.data
    },
    onSuccess: () => {
      toast.success("Invitation accepted!")
      router.replace("/dashboard")
    },
    onError: (error) => {
      const errorData = error.response?.data as { detail: string }

      if (error.response?.status === 409) {
        form.setError("email", {
          message: errorData.detail,
        })
      } else {
        toast.error(errorData.detail ?? "Something went wrong")
      }
    },
  })

  const form = useForm<FormValues>({
    defaultValues: {
      token: searchParams.get("token") ?? "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
    resolver: zodResolver(schema),
  })

  const handleSubmit = (data: FormValues) => {
    console.log({ data })
    mutation.mutate(data)
  }

  const description = isLoading
    ? "Please wait while we verify your invitation."
    : isError
      ? "This invite has expired or is no longer valid."
      : `Set your account to continue to join ${data.companyName} on FastRecruiter.`

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="relative">
          <Icons.logo className="absolute -top-10 left-1/2 mr-2 h-20 w-20 -translate-x-1/2" />
          <CardTitle className="mt-0 text-center text-lg font-medium">
            Company Invitation
          </CardTitle>
          <CardDescription className="text-center text-sm text-gray-500">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <Spinner className="mx-auto mt-4 text-blue-500" size={32} />
          ) : isSuccess ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                  <div className="space-y-3">
                    <FormField
                      name="email"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormDescription>
                            This is the email address where your invitation was
                            delivered.
                          </FormDescription>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="firstName"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="lastName"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="password"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="pt-6">
                    <Button
                      className="w-full"
                      type="submit"
                      // disabled={mutation.isPending || !form.formState.isValid}
                    >
                      {mutation.isPending ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        "Join Now"
                      )}
                    </Button>
                  </div>
                  <input type="hidden" {...form.register("token")} />
                </form>
              </Form>
            </motion.div>
          ) : (
            <Button className="w-full" asChild>
              <Link href="/">Exit</Link>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
