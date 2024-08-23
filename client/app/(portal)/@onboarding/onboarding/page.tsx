"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { signOut } from "@/components/SessionProvider"

export default function OnboardingPage() {
  return (
    <Dialog open>
      <DialogContent className="sm:max-w-[425px]" hideCloseButton>
        <h1 className="text-2xl ">
          You have been redirected to onboarding route to complete your profile
        </h1>
        <DialogFooter>
          <Button
            variant="link"
            onClick={() =>
              signOut({
                callbackUrl: "/sign-in",
              })
            }
          >
            Sign out
          </Button>
          <Button>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
