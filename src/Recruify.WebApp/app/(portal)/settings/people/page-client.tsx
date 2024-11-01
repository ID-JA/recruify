"use client"

import { useState } from "react"
import { CircleOff } from "lucide-react"

import { usePeople } from "@/lib/react-query/use-people"
import { clientAccessCheck } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useInviteMembersModal } from "@/components/members/invite-members-modal"
import {
  MemberCard,
  SkeletonMemberCard,
} from "@/components/members/member-card"
import { useSession } from "@/components/SessionProvider"

export default function PageClient() {
  const [activeTab, setActiveTab] = useState("members")
  const { InviteMembersModal, setShowInviteMembersModal } =
    useInviteMembersModal()
  const { data: user } = useSession()

  const { data, isLoading } = usePeople({
    invites: activeTab === "invitations",
    companyId: user?.companyId as string,
  })
  return (
    <>
      <InviteMembersModal />
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
                action: "Permissions.Member.Create",
                userPermissions: user?.userPermissions,
              }).error
            }
            onClick={() => {
              console.log("invite member")
              setShowInviteMembersModal(true)
            }}
            disabledTooltip="You don't have permission to invite members"
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
              className="disabled:pointer-events-auto disabled:cursor-not-allowed disabled:opacity-50"
              value="invitations"
              disabled={
                clientAccessCheck({
                  action: "Permissions.Member.Create",
                  userPermissions: user?.userPermissions,
                }).error
              }
            >
              Invitations
            </TabsTrigger>
          </TabsList>
          <TabsContent value="members">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <SkeletonMemberCard key={index} />
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
                <SkeletonMemberCard key={index} />
              ))
            ) : data.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10">
                <CircleOff className="h-8 w-8 text-gray-500" />
                <p className="mt-2 text-sm text-gray-500">No data to show</p>
              </div>
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
    </>
  )
}
