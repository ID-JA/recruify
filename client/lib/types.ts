export type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  imageUrl: string
  refreshToken: string
  role: string
  createdAt: Date
  companyId: string | null
}
