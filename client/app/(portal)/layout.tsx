"use client"

import { ReactNode, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SideNav } from "@/components/layout/side-nav"

export default function Layout({
  children,
  onboarding,
}: {
  children: ReactNode
  onboarding: ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="min-h-screen w-full bg-gray-100/80 text-black">
      <SideNav isOpen={isOpen} />
      <main
        className={cn("h-screen py-2 transition-all", {
          "ml-[300px]": isOpen,
          "ml-0": !isOpen,
        })}
      >
        <ScrollArea className="relative h-full w-full overflow-hidden rounded-md border bg-white px-2.5">
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
          {children}
        </ScrollArea>
      </main>
      {onboarding}
    </div>
  )
}
