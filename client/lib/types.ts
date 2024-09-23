export type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  imageUrl: string
  refreshToken: string
  role: string
  createdAt: string
  companyId: string
  userPermissions: UserPermission[]
}

export type UserPermission = {
  id: string
  permission: string
  isAllowed: boolean
}
