"use client"

import { Dispatch, SetStateAction, useCallback, useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

import { Switch } from "../ui/switch"

interface Permission {
  id: string
  permission: string
  isAllowed: boolean
}

interface MemberPermissionModalProps {
  member: {
    id: string
    firstName: string
    lastName: string
    userPermissions: Permission[]
  }
  onSave: (memberId: string, updatedPermissions: Permission[]) => void
  showMemberPermissionsModal: boolean
  setShowMemberPermissionsModal: Dispatch<SetStateAction<boolean>>
}

function MemberPermissionModal({
  member,
  onSave,
  showMemberPermissionsModal,
  setShowMemberPermissionsModal,
}: MemberPermissionModalProps) {
  const [permissions, setPermissions] = useState<Permission[]>(
    member.userPermissions
  )

  const handlePermissionChange = (permissionId: string) => {
    setPermissions((prevPermissions) =>
      prevPermissions.map((permission) =>
        permission.id === permissionId
          ? { ...permission, isAllowed: !permission.isAllowed }
          : permission
      )
    )
  }

  const handleSave = () => {
    onSave(member.id, permissions)
  }

  return (
    <Dialog
      open={showMemberPermissionsModal}
      onOpenChange={setShowMemberPermissionsModal}
      aria-describedby="modal-description"
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Edit Permissions for {member.firstName} {member.lastName}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {permissions.map(({ id, permission, isAllowed }) => (
            <div key={id} className="flex items-center justify-between">
              <Label htmlFor={id}>{permission}</Label>
              <Switch
                id={id}
                checked={isAllowed}
                onCheckedChange={() => handlePermissionChange(id)}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export const useMemberPermissionsModal = ({
  member,
  onSave,
}: {
  member: any
  onSave: any
}) => {
  const [showMemberPermissionsModal, setShowMemberPermissionsModal] =
    useState(false)

  const MemberPermissionsModalCallback = useCallback(() => {
    return (
      <MemberPermissionModal
        member={member}
        onSave={onSave}
        showMemberPermissionsModal={showMemberPermissionsModal}
        setShowMemberPermissionsModal={setShowMemberPermissionsModal}
      />
    )
  }, [
    member,
    onSave,
    showMemberPermissionsModal,
    setShowMemberPermissionsModal,
  ])

  return useMemo(() => {
    return {
      MemberPermissionsModal: MemberPermissionsModalCallback,
      setShowMemberPermissionsModal,
    }
  }, [MemberPermissionsModalCallback, setShowMemberPermissionsModal])
}
