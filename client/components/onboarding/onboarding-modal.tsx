"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircledIcon, ReloadIcon } from "@radix-ui/react-icons"
import { AnimatePresence, motion } from "framer-motion"
import { SubmitHandler, useForm } from "react-hook-form"
import z from "zod"

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
    fields: ["name", "industry", "size", "location"],
  },
  {
    id: "invite-members",
    title: "Invite Members",
    description:
      "Add your team members to your portal. They will receive an invitation to join and collaborate",
    component: InviteMembers,
    fields: ["email"],
  },
]

const FormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  industry: z.string().min(1, "Name is required"),
  size: z.string().min(1, "Name is required"),
  location: z.string().min(1, "Name is required"),
  emails: z.array(z.string().email()).optional(),
})

type Inputs = z.infer<typeof FormSchema>
type FieldName = keyof Inputs

export function OnboardingModal() {
  const [currentStep, setCurrentStep] = useState(0)
  const router = useRouter()
  const step = steps[currentStep]

  const form = useForm<Inputs>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      industry: "",
      size: "",
      location: "",
      emails: [],
    },
  })

  const processForm: SubmitHandler<Inputs> = (data) => {
    console.log(data)
  }

  const next = async () => {
    if (form.formState.isSubmitSuccessful) {
      router.replace("/dashboard", { scroll: false })
    } else {
      const fields = steps[currentStep].fields as FieldName[]

      const isValid = await form.trigger(fields, { shouldFocus: true })

      if (!isValid) return

      if (currentStep < steps.length - 1) {
        setCurrentStep((s) => s + 1)
      } else {
        await form.handleSubmit(
          (values) =>
            new Promise<void>((resolve) => {
              setTimeout(() => {
                processForm(values)
                resolve()
              }, 5000)
            })
        )()
        setCurrentStep((s) => s + 1)
      }
    }
  }

  return (
    <Dialog open>
      <DialogContent
        className="sm:max-w-[450px]  overflow-hidden"
        hideCloseButton
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
              <CheckCircledIcon className="h-16 w-16 text-blue-500 mx-auto" />
              <h1 className="text-lg text-center mt-2">Congratulations!</h1>
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
            {form.formState.isSubmitSuccessful
              ? "Go to Dashboard"
              : currentStep === steps.length - 1
                ? form.formState.isSubmitting
                  ? "Submitting"
                  : "Submit"
                : "Next"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
