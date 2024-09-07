"use client"

import Link from "next/link"
import {
  ChevronsUpDown,
  LayoutGrid,
  LogOut,
  Settings,
  User,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"

import { signOut, useSession } from "../SessionProvider"
import { Button } from "../ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"

export function UserDropdown() {
  const { data } = useSession()

  return (
    <>
      {data?.user ? (
        <DropdownMenu>
          <TooltipProvider disableHoverableContent>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={`https://api.dicebear.com/9.x/initials/svg?seed=${data.user.firstName}+${data.user.lastName}`}
                        alt="Avatar"
                      />
                      <AvatarFallback className="bg-transparent">
                        {data.user.firstName?.charAt(0)}
                        {data.user.lastName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side="bottom">Profile</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {data.user.firstName} {data.user.lastName}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {data.user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="hover:cursor-pointer" asChild>
                <Link href="/dashboard" className="flex items-center">
                  <LayoutGrid className="mr-3 h-4 w-4 text-muted-foreground" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:cursor-pointer" asChild>
                <Link href="/account" className="flex items-center">
                  <User className="mr-3 h-4 w-4 text-muted-foreground" />
                  Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:cursor-pointer" asChild>
                <Link href="/settings" className="flex items-center">
                  <Settings className="mr-3 h-4 w-4 text-muted-foreground" />
                  Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="hover:cursor-pointer"
              onClick={() => signOut({ callbackUrl: "/sign-in" })}
            >
              <LogOut className="mr-3 h-4 w-4 text-muted-foreground" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Skeleton className="h-8 w-8 rounded-full" />
      )}
    </>
  )
}
