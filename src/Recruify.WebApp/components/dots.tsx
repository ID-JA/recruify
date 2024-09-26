"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"

export function Dots({
  currentStep,
  total,
}: {
  currentStep: number
  total: number
}) {
  return (
    <div className="flex items-center justify-center space-x-4">
      {Array.from({ length: total }).map((_step, i) => (
        <Dot key={i} currentStep={currentStep} step={i} />
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
            complete: { backgroundColor: "#D1D5DB" },
          }}
        />
        {step < 3 && (
          <motion.div
            initial={{ scaleX: 0, transformOrigin: "right" }}
            animate={controls}
            className="h-2 w-8 absolute rounded-full left-0 bg-blue-600 z-50"
          ></motion.div>
        )}
      </motion.div>
    </>
  )
}
