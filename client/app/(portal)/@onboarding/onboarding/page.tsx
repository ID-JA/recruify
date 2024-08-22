import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function OnboardingPage() {
  return (
    <Dialog open>
      <DialogContent className="sm:max-w-[425px]" hideCloseButton>
        <DialogHeader>
          <DialogTitle>Onboarding Modal</DialogTitle>
        </DialogHeader>
        <h1 className="text-2xl ">
          You have been redirected to onboarding route to complete your profile
        </h1>
        <DialogFooter>
          <Button variant="link">Sign out</Button>
          <Button>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
