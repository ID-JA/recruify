import { useQuery } from "@tanstack/react-query"

import { http } from "../utils"

export const usePeople = ({ invites }: { invites: boolean }) => {
  const query = useQuery({
    queryKey: ["company-people", invites ? "invites" : "members"],
    queryFn: async () => {
      const res = await http.get(
        `/api/companies/C80DF3B3-8967-4BA5-C156-08DCCAB6B471/${
          invites ? "invitees" : "members"
        }`
      )
      return invites ? res.data.companyInvites : res.data.users
    },
  })
  return query
}
