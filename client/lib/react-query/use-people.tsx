import { useQuery } from "@tanstack/react-query"

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
