"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bell,
  Building,
  FileText,
  Home,
  LucideIcon,
  Map,
  User,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ContentLayout } from "@/components/layout/content-layout"
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
          href: "/settings/members",
          label: "Members",
          active: pathname === "/settings/members",
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
