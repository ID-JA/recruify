"use client"

import { ChevronsUpDown } from "lucide-react"

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

export function UserDropdown() {
  const { data } = useSession()

  return (
    <>
      {data?.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex cursor-pointer items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage
                    src={
                      "https://api.dicebear.com/9.x/initials/svg?seed=JAMAL+ID+AISSA"
                    }
                    alt="user avatar"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">Jamal Id Aissa</div>
                  <div className="text-sm text-gray-600">
                    idaissa93@gmail.com
                  </div>
                </div>
              </div>
              <ChevronsUpDown className="h-5 w-5 shrink-0 opacity-50" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  signOut({ callbackUrl: "/" })
                }}
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Skeleton className="h-12 w-12 rounded-full" />
      )}
    </>
  )
}
