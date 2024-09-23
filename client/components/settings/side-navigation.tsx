"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useSelectedLayoutSegment } from "next/navigation"
import {
  Bell,
  Building,
  ChevronDown,
  FileText,
  Home,
  LucideIcon,
  Map,
  MenuIcon,
  User,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Menu } from "@/components/layout/menu"

type Menu = {
  href: string
  label: string
  active: boolean
  icon: LucideIcon
}

type Group = {
  groupLabel: string
  menus: Menu[]
}
function getSideMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "Account",
      menus: [
        {
          href: "/settings",
          label: "General",
          active: pathname === "/settings",
          icon: Home,
        },
        {
          href: "/settings/profile",
          label: "Profile",
          active: pathname === "/settings/profile",
          icon: User,
        },
        {
          href: "/settings/notifications",
          label: "Notifications",
          active: pathname === "/settings/notifications",
          icon: Bell,
        },
      ],
    },
    {
      groupLabel: "Company Settings",
      menus: [
        {
          href: "/settings/company",
          label: "Company Details",
          active: pathname === "/settings/company",
          icon: Building,
        },
        {
          href: "/settings/people",
          label: "People",
          active: pathname === "/settings/people",
          icon: User,
        },
        {
          href: "/settings/locations",
          label: "Locations",
          active: pathname === "/settings/locations",
          icon: Map,
        },
      ],
    },
    {
      groupLabel: "Hiring Settings",
      menus: [
        {
          href: "/settings/hiring/career-page",
          label: "Career Page Editor",
          active: pathname === "/settings/hiring/career-page",
          icon: FileText,
        },
      ],
    },
  ]
}
export function SideNavigation() {
  const pathname = usePathname()
  const sideMenuList = getSideMenuList(pathname)
  return (
    <nav>
      <ul className="flex flex-col items-start space-y-1 px-2">
        {sideMenuList.map(({ groupLabel, menus }, index) => (
          <li key={index}>
            {groupLabel && (
              <p className="max-w-[248px] truncate px-4 pb-2 text-sm font-normal text-muted-foreground">
                {groupLabel}
              </p>
            )}
            {menus.map(({ href, label, active, icon: Icon }, index) => (
              <div className="w-full" key={index}>
                <Button
                  variant="ghost"
                  className={cn(
                    "mb-1 h-10 w-full justify-start text-gray-500",
                    {
                      "bg-primary/10 text-primary": active,
                    }
                  )}
                  asChild
                >
                  <Link href={href}>
                    <span className="mr-4">
                      <Icon size={18} />
                    </span>
                    <p className="max-w-[200px] truncate">{label}</p>
                  </Link>
                </Button>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function SettingsNavMobile() {
  const pathname = usePathname()
  const sideMenuList = getSideMenuList(pathname)
  const [openPopover, setOpenPopover] = useState(false)

  // Find the active menu item
  const activeMenuItem = sideMenuList
    .flatMap((group) => group.menus)
    .find((menu) => menu.active)

  const Icon = activeMenuItem?.icon ?? MenuIcon
  const label = activeMenuItem?.label ?? "Menu"

  return (
    <Popover open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            "w-full border hover:bg-white sm:w-auto sm:min-w-[200px] [&>div]:w-full",
            {
              "bg-white ring-2": openPopover,
            }
          )}
          variant="secondary"
        >
          <div className="flex w-full items-center gap-2">
            <div className="relative shrink-0">
              <Icon className="h-4 w-4" />
            </div>
            <span className="grow text-left">{label}</span>
            <ChevronDown
              className={cn("h-4 w-4 text-gray-400 transition-transform", {
                "rotate-180": openPopover,
              })}
            />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="flex w-full flex-col gap-4 px-5 sm:min-w-[200px] sm:px-4 sm:py-3"
        onClick={(e) => {
          if (e.target instanceof HTMLElement && e.target.tagName === "A")
            setOpenPopover(false)
        }}
      >
        {sideMenuList.map(({ menus, groupLabel }, index) => (
          <div key={index}>
            {groupLabel && (
              <span className="pb-1.5 text-sm text-gray-500">{groupLabel}</span>
            )}
            {menus.map(({ href, label, icon: Icon }, index) => (
              <div className="w-full" key={index}>
                <Button
                  variant="ghost"
                  className="mb-1 h-10 w-full justify-start text-gray-500"
                  asChild
                >
                  <Link className="max-w-[200px] truncate" href={href}>
                    <span className="mr-4">
                      <Icon size={18} />
                    </span>
                    {label}
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  )
}
