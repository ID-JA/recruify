import { useState } from "react"
import { X } from "lucide-react"
import { useFormContext } from "react-hook-form"
import { z } from "zod"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"

const emailSchema = z.string().email("Invalid email address")

export function InviteMembers() {
  const { control, setValue, watch, trigger } = useFormContext()
  const [inputValue, setInputValue] = useState("")
  const [inputError, setInputError] = useState("")
  const invitees = watch("invitees") || []

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

  return (
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
  )
}
