"use client"

import { useState } from "react"
import { Ellipsis } from "lucide-react"
import { useStore } from "zustand"

import { usePeople } from "@/lib/react-query/use-people"
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
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMemberPermissionsModal } from "@/components/members/member-permission-modal"
import { useSession } from "@/components/SessionProvider"

export default function PageClient() {
  const [activeTab, setActiveTab] = useState("members")

  const userInfo = useUserInfoStore((state) => state.data)

  const { data, isLoading } = usePeople({
    invites: activeTab === "invitations",
  })
  return (
    <div>
      <div className="mb-5 flex flex-col items-center justify-between space-y-3 sm:mb-10 sm:flex-row sm:space-y-0">
        <div className="flex flex-col space-y-3">
          <h2 className="text-xl font-medium">People</h2>
          <p className="text-sm text-gray-500">
            Teammates that have access to company's portal.
          </p>
        </div>
        <div>
          <Button
            disabled={
              clientAccessCheck({
                action: "Permissions.Members.Write",
                userPermissions: userInfo?.userPermissions,
              }).error || undefined
            }
          >
            Invite Member
          </Button>
        </div>
      </div>
      <div>
        <Tabs
          defaultValue="members"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger
              value="invitations"
              disabled={
                clientAccessCheck({
                  action: "Permissions.Members.Write",
                  userPermissions: userInfo?.userPermissions,
                }).error || undefined
              }
            >
              Invitations
            </TabsTrigger>
          </TabsList>
          <TabsContent value="members">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-4"
                >
                  <div className="flex items-center">
                    <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200"></div>
                    <div className="ml-4">
                      <div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
                      <div className="mt-1 h-3 w-32 animate-pulse rounded bg-gray-200"></div>
                    </div>
                  </div>
                  <div className="h-4 w-12 animate-pulse rounded bg-gray-200"></div>
                </div>
              ))
            ) : (
              <ul className="divide-y divide-gray-200">
                {data.map((user: any) => (
                  <MemberCard key={user.id} user={user} activeTab={activeTab} />
                ))}
              </ul>
            )}
          </TabsContent>
          <TabsContent value="invitations">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-4"
                >
                  <div className="flex items-center">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="ml-4">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="mt-1 h-3 w-32" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-12" />
                </div>
              ))
            ) : (
              <ul className="divide-y divide-gray-200">
                {data.map((user: any) => (
                  <MemberCard key={user.id} user={user} activeTab={activeTab} />
                ))}
              </ul>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function MemberCard({ user, activeTab }: { user: any; activeTab: string }) {
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
        className="flex items-center justify-between space-x-3 px-4 py-3"
      >
        <div className="flex items-start space-x-3">
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
        <div className="flex items-center space-x-2">
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
                  onClick={() => setShowMemberPermissionsModal(true)}
                  disabled={isNotAllowed}
                >
                  Edit Permissions
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                className="bg-red-50 text-red-500 focus:bg-red-500 focus:text-white"
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
