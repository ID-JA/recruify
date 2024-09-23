"use client"

import { cn } from "@/lib/utils"
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle"
import { useStore } from "@/hooks/use-store"

import { useSession } from "../SessionProvider"
import { ScrollArea } from "../ui/scroll-area"
import { Sidebar } from "./sidebar"

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const sidebar = useStore(useSidebarToggle, (state) => state)
  const { data: user } = useSession()

  if (!user || !sidebar) return null

  return (
    <>
      <Sidebar />
      <main
        className={cn(
          "h-screen bg-gray-50 transition-[margin-left] duration-300 ease-in-out dark:bg-zinc-900",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
        )}
      >
        <ScrollArea className="relative h-full w-full overflow-hidden">
          {children}
        </ScrollArea>
      </main>
    </>
  )
}
