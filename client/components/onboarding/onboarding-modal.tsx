"use client"

import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const Steps = [WelcomeStep, CompanyInformationStep, InviteMembersStep]
export function OnboardingModal() {
  const [currentStep, setCurrentStep] = useState(0)

  const handleStepClick = (index: number) => {
    setCurrentStep(index)
  }

  const Step = Steps[currentStep]

  return (
    <Dialog open>
      <DialogContent className="sm:max-w-[425px]" hideCloseButton>
        <Step />
        <Dots currentStep={currentStep} />
        <DialogFooter>
          {currentStep > 0 && (
            <Button
              variant="outline"
              onClick={() => {
                handleStepClick(currentStep - 1)
              }}
            >
              Back
            </Button>
          )}
          <Button
            onClick={() => {
              if (currentStep === Steps.length - 1) {
                // send data to api
                return
              }
              handleStepClick(currentStep + 1)
            }}
          >
            {currentStep === Steps.length - 1
              ? "Finish"
              : currentStep === 0
                ? "Get Started"
                : "Next"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function WelcomeStep() {
  return (
    <>
      <div className="w-full h-40 bg-gray-400 flex items-center justify-center">
        IMAGE GOES HERE
      </div>
      <h1 className="text-lg font-bold">Welcome to FastRecruiter</h1>
      <p className="text-gray-600">
        We're excited to have you onboard. Let's get you set up so you can hit
        the ground running.
      </p>
    </>
  )
}

function CompanyInformationStep() {
  return (
    <>
      <h1 className="text-lg font-bold">Create Your Company</h1>
      <p className="text-gray-600">
        Tell us about the company you're hiring for.
      </p>
      <div className="space-y-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Company Name</Label>
          <Input type="email" id="email" placeholder="Email" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Industry</Label>
          <Input type="email" id="email" placeholder="Email" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Company Size</Label>
          <Input type="email" id="email" placeholder="Email" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Location</Label>
          <Input type="email" id="email" placeholder="Email" />
        </div>
      </div>
    </>
  )
}

function InviteMembersStep() {
  return (
    <>
      <h1 className="text-lg font-bold">Invite Your Team</h1>
      <p className="text-gray-600">
        Add your team members to Fast Recruiter. They’ll receive an invitation
        to join and collaborate{" "}
      </p>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Email" />
      </div>
    </>
  )
}

function Dots({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-center space-x-4">
      {[0, 1, 2, 3].map((step) => (
        <Dot key={step} currentStep={currentStep} step={step} />
      ))}
    </div>
  )
}

function Dot({ currentStep, step }: { currentStep: number; step: number }) {
  const status =
    currentStep === step
      ? "active"
      : currentStep < step
        ? "inactive"
        : "complete"

  const controls = useAnimation()
  useEffect(() => {
    if (status === "complete") {
      controls.start({
        scaleX: 1,
        transformOrigin: "left",
      })
      setTimeout(() => {
        controls.start({
          scaleX: 0,
          transformOrigin: "right",
        })
      }, 500)
    }
  }, [controls, status])

  return (
    <>
      <motion.div className="relative flex items-center justify-center">
        <motion.span
          className="h-2 w-2 rounded-full inline-block"
          animate={status}
          initial="inactive"
          transition={{ delay: 0.1 }}
          variants={{
            inactive: { backgroundColor: "#D1D5DB" },
            active: { backgroundColor: "#2563EB" },
            complete: { backgroundColor: "#2563EB" },
          }}
        />
        {step < 3 && (
          <motion.div
            initial={{ scaleX: 0, transformOrigin: "right" }}
            animate={controls}
            className="h-2 w-8 absolute rounded-full left-0  bg-blue-600 z-50"
          ></motion.div>
        )}
      </motion.div>
    </>
  )
}
