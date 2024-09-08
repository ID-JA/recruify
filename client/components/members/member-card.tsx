"use client"

import { Ellipsis } from "lucide-react"
import { useStore } from "zustand"

import { clientAccessCheck, timeAgo } from "@/lib/utils"
import { useUserInfoStore } from "@/hooks/use-user-info"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSession } from "@/components/SessionProvider"

import { Skeleton } from "../ui/skeleton"
import { useMemberPermissionsModal } from "./member-permission-modal"

export function MemberCard({
  user,
  activeTab,
}: {
  user: any
  activeTab: string
}) {
  const { setShowMemberPermissionsModal, MemberPermissionsModal } =
    useMemberPermissionsModal({
      member: user,
      onSave: () => {},
    })
  const { data: session } = useSession()
  const userInfo = useStore(useUserInfoStore, (state) => state.data)

  const expiredInvite =
    activeTab === "invitations" &&
    user.expireAt &&
    Date.now() - new Date(user.expireAt).getTime() > 1 * 24 * 60 * 60 * 1000

  const isNotAllowed = clientAccessCheck({
    action: "Permission.Members.Write",
    userPermissions: userInfo?.userPermissions,
  }).error

  const name = user.firstName
    ? `${user.firstName} ${user.lastName}`
    : user.email
  return (
    <>
      {activeTab === "members" && <MemberPermissionsModal />}
      <div
        key={user.id}
        className="flex items-center justify-between px-4 py-3"
      >
        <div className="flex items-start">
          <Avatar className="h-10 w-10 rounded-full">
            <AvatarImage src={user.imageUrl} />
            <AvatarFallback>
              {user.firstName
                ? `${user.firstName[0]}${user.lastName[0]}`
                : user.email[0]}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-900">{name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {activeTab === "members" ? (
            <div className="text-sm text-gray-500">{user.role}</div>
          ) : (
            <>
              {expiredInvite && <Badge variant="outline">Expired</Badge>}
              <p
                className="text-right text-sm text-gray-500 sm:min-w-28"
                suppressHydrationWarning
              >
                Invited {timeAgo(user.createdAt)}
              </p>
            </>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Ellipsis className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              {activeTab === "members" && (
                <DropdownMenuItem
                  className="data-[disabled]:pointer-events-auto data-[disabled]:cursor-not-allowed"
                  onClick={() => setShowMemberPermissionsModal(true)}
                  disabled={isNotAllowed}
                >
                  Edit Permissions
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                className="bg-red-50 text-red-500 focus:bg-red-500 focus:text-white data-[disabled]:pointer-events-auto data-[disabled]:cursor-not-allowed"
                disabled={isNotAllowed && session?.user?.email !== user.email}
              >
                {session?.user?.email === user.email
                  ? "Leave Company"
                  : "Remove"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  )
}

export function SkeletonMemberCard() {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="ml-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-1 h-3 w-32" />
        </div>
      </div>
      <Skeleton className="h-4 w-12" />
    </div>
  )
}
