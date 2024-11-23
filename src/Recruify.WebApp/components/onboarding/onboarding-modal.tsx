"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircledIcon, ReloadIcon } from "@radix-ui/react-icons"
import { useMutation } from "@tanstack/react-query"
import { AnimatePresence, motion } from "framer-motion"
import { SubmitHandler, useForm } from "react-hook-form"
import z from "zod"

import { http } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Dots } from "../dots"
import { Form } from "../ui/form"
import { CompanyInformation } from "./company-info"
import { InviteMembers } from "./invite-members"
import { Welcome } from "./welcome"

const steps = [
  {
    id: "welcome",
    title: "",
    description: "",
    component: Welcome,
    fields: [],
  },
  {
    id: "company-information",
    title: "Company Information",
    description: "Tell us about your company you are hiring for.",
    component: CompanyInformation,
    fields: ["name", "industry", "size"],
  },
  {
    id: "invite-members",
    title: "Invite Members",
    description:
      "Add your team members to your portal. They will receive an invitation to join and collaborate",
    component: InviteMembers,
    fields: ["invitees"],
  },
]

const FormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  industry: z.string().min(1, "Name is required"),
  size: z.string().min(1, "Name is required"),
  invitees: z
    .array(z.string().email("Invalid email address"))
    .optional()
    .default([]),
})

type Inputs = z.infer<typeof FormSchema>
type FieldName = keyof Inputs

export function OnboardingModal() {
  const [currentStep, setCurrentStep] = useState(0)
  const router = useRouter()
  const step = steps[currentStep]
  const [open, setOpen] = useState(true)

  const form = useForm<Inputs>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      industry: "",
      size: "",
      invitees: [],
    },
  })

  const mutation = useMutation({
    mutationFn: (data: Inputs) => {
      return http.post("/api/companies/register", data)
    },
    onSuccess: async () => {
      try {
        await http.post("/api/auth/refresh-token")
      } catch (error) {
        console.error("Failed to refresh token:", error)
      }
    },
  })

  const processForm: SubmitHandler<Inputs> = (data) => {
    console.log({ data })
    mutation.mutate(data)
  }

  const next = async () => {
    if (currentStep < steps.length - 1) {
      const fields = steps[currentStep].fields as FieldName[]

      const isValid = await form.trigger(fields, { shouldFocus: true })

      if (!isValid) return
      setCurrentStep((s) => s + 1)
    } else {
      if (mutation.isSuccess) {
        router.replace("/dashboard", { scroll: false })
        setOpen(false)
      } else {
        await form.handleSubmit((values) => processForm(values))()
        setCurrentStep((s) => s + 1)
      }
    }
  }

  return (
    <Dialog open={open}>
      <DialogContent
        className="overflow-hidden sm:max-w-[450px]"
        withCloseButton={false}
      >
        {currentStep < steps.length ? (
          <>
            <DialogHeader>
              <DialogTitle>{step.title}</DialogTitle>
              <DialogDescription className="text-gray-500">
                {step.description}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(processForm)}>
                <AnimatePresence mode="popLayout">
                  {currentStep === 0 && (
                    <motion.div
                      exit={{ x: -500 }}
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                      }}
                      key="welcome"
                    >
                      <Welcome />
                    </motion.div>
                  )}
                  {currentStep === 1 && (
                    <motion.div
                      initial={{ x: 500 }}
                      animate={{ x: 0 }}
                      exit={{ x: -500 }}
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                      }}
                      key="company-information"
                      className="space-y-4"
                    >
                      <CompanyInformation />
                    </motion.div>
                  )}
                  {currentStep === 2 && (
                    <motion.div
                      key="invite-members"
                      initial={{ x: 500 }}
                      animate={{ x: 0 }}
                      exit={{ x: -500 }}
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                      }}
                    >
                      <InviteMembers />
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </Form>
            <Dots currentStep={currentStep} total={steps.length} />
          </>
        ) : (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              y: { type: "spring", stiffness: 300, damping: 30 },
            }}
          >
            <div>
              <CheckCircledIcon className="mx-auto h-16 w-16 text-blue-500" />
              <h1 className="mt-2 text-center text-lg">Congratulations!</h1>
              <p className="text-center text-sm text-gray-500">
                Your company is all set. Start optimizing your recruitment
                process now.
              </p>
            </div>
          </motion.div>
        )}
        <DialogFooter>
          <Button
            type="button"
            className="w-full"
            onClick={next}
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            {mutation.isSuccess
              ? "Close"
              : currentStep === steps.length - 1
                ? mutation.isPending
                  ? "Submitting"
                  : "Submit"
                : "Next"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
