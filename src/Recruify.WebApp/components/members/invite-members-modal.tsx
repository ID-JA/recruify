"use client"

import { Dispatch, SetStateAction, useCallback, useMemo, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { X } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useInvitePeople } from "@/lib/react-query/use-people"
import { http } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { useSession } from "../SessionProvider"
import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"

interface InviteMembersModalProps {
  showInviteMembersModal: boolean
  setShowInviteMembersModal: Dispatch<SetStateAction<boolean>>
}

const emailSchema = z.string().email("Invalid email address")

const FormSchema = z.object({
  invitees: z
    .array(z.string().email("Invalid email address"))
    .min(1, "Invite at least one email address"),
})
function InviteMembersModal({
  setShowInviteMembersModal,
  showInviteMembersModal,
}: InviteMembersModalProps) {
  const form = useForm({
    resolver: zodResolver(FormSchema),
  })
  const { watch, setValue, trigger, control } = form
  const [inputValue, setInputValue] = useState("")
  const [inputError, setInputError] = useState("")
  const invitees = watch("invitees") || []
  const { data: user } = useSession()
  const addEmail = async (email: string) => {
    try {
      await emailSchema.parseAsync(email)
      if (!invitees.includes(email)) {
        setValue("invitees", [...invitees, email], { shouldValidate: true })
        setInputValue("")
        setInputError("")
        await trigger("invitees")
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log(error.errors)
        setInputError(error.errors[0].message)
      }
    }
  }

  const removeEmail = (email: string) => {
    setValue(
      "invitees",
      invitees.filter((e: string) => e !== email)
    )
  }

  const { mutate } = useInvitePeople()

  return (
    <Dialog
      open={showInviteMembersModal}
      onOpenChange={setShowInviteMembersModal}
      aria-describedby="modal-description"
    >
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Invite Members</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Add your team members to your portal. They will receive an invitation
        </DialogDescription>
        <Form {...form}>
          <form
            className="space-y-8"
            onSubmit={form.handleSubmit(async () => {
              mutate(
                {
                  invitees,
                  companyId: user?.companyId as string,
                  companyName: "Google",
                },
                {
                  onSuccess: () => {
                    form.reset()
                    setShowInviteMembersModal(false)
                  },
                }
              )
            })}
          >
            <FormField
              name="invitees"
              control={control}
              render={() => (
                <FormItem>
                  <FormLabel>Emails</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2 rounded-md border p-2">
                      {invitees.map((email: string) => (
                        <span
                          key={email}
                          className="flex items-center rounded-full bg-gray-200 px-2 py-1 text-sm"
                        >
                          {email}
                          <X
                            className="ml-1 h-4 w-4 cursor-pointer"
                            onClick={() => removeEmail(email)}
                          />
                        </span>
                      ))}
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addEmail(inputValue.trim())
                          }
                        }}
                        className="flex-grow border-none focus:ring-0"
                        placeholder="Enter email and press Enter"
                      />
                    </div>
                  </FormControl>
                  {inputError && (
                    <p className="mt-1 text-sm text-red-500">{inputError}</p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" disabled={invitees.length === 0}>
              Send Invitations
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export const useInviteMembersModal = () => {
  const [showInviteMembersModal, setShowInviteMembersModal] = useState(false)

  const InviteMembersModalCallback = useCallback(() => {
    return (
      <InviteMembersModal
        showInviteMembersModal={showInviteMembersModal}
        setShowInviteMembersModal={setShowInviteMembersModal}
      />
    )
  }, [showInviteMembersModal, setShowInviteMembersModal])

  return useMemo(() => {
    return {
      InviteMembersModal: InviteMembersModalCallback,
      setShowInviteMembersModal,
    }
  }, [InviteMembersModalCallback, setShowInviteMembersModal])
}
