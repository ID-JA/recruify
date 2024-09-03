"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BriefcaseBusinessIcon,
  CalendarIcon,
  ChartPieIcon,
  InboxIcon,
  LayoutDashboardIcon,
  NetworkIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

import { UserDropdown } from "./user-dropdown"

const navigationLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    label: "Job Offers",
    href: "/job-offers",
    icon: BriefcaseBusinessIcon,
  },
  {
    label: "Talent Pool",
    href: "/talent-pool",
    icon: NetworkIcon,
  },
  {
    label: "Inbox",
    href: "/inbox",
    icon: InboxIcon,
  },
  {
    label: "Calendar",
    href: "/calendar",
    icon: CalendarIcon,
  },
  {
    label: "Reports",
    href: "/reports",
    icon: ChartPieIcon,
  },
]

export function SideNav({ isOpen }: { isOpen: boolean }) {
  const pathname = usePathname()
  const isActive = (path: string) => path === pathname

  return (
    <div
      className={cn(
        "fixed inset-0 z-20 h-full w-full max-w-[300px] transform px-2.5 py-2 transition-transform",
        {
          "-translate-x-full": !isOpen,
          "translate-x-0": isOpen,
        }
      )}
    >
      <UserDropdown />
      <hr className="my-4" />
      <div className="space-y-4">
        {navigationLinks.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex items-center rounded-md px-2 py-1.5 text-sm font-medium transition-colors",
              {
                "bg-white text-accent-foreground shadow-sm": isActive(
                  item.href
                ),
                "text-muted-foreground hover:bg-gray-50": !isActive(item.href),
              }
            )}
          >
            <item.icon className="mr-2 h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
