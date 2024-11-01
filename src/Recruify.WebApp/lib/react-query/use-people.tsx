import { useMutation, useQuery } from "@tanstack/react-query"

import { http } from "../utils"

export const usePeople = ({
  invites,
  companyId,
}: {
  invites: boolean
  companyId: string
}) => {
  const query = useQuery({
    queryKey: ["company-people", invites ? "invites" : "members"],
    queryFn: async () => {
      const res = await http.get(
        `/api/companies/${companyId}/${invites ? "invitees" : "members"}`
      )
      return invites ? res.data.companyInvites : res.data.users
    },
  })
  return query
}

export const useInvitePeople = () => {
  const mutation = useMutation({
    mutationKey: ["invite-people"],
    mutationFn: async (data: {
      invitees: string[]
      companyId: string
      companyName: string
    }) => {
      const res = await http.post(
        `/api/companies/${data.companyId}/invitees`,
        data
      )
      return res.data
    },
  })
  return mutation
}
