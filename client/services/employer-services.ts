import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { version } from 'utils/axios'

export type JobOffersResponse = {
  data: {
    id: string
    title: string
    location: string
    companyName: string
    createdAt: Date
    candidatesCount: number
    status: number
  }[]
  currentPage: number
  totalPages: number
  totalCount: number
  pageSize: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export const createNewJob = async (data: unknown) => {
  return await axios.post(`${version}/job`, data)
}

export async function getJobOffers({
  sortBy,
}: {
  sortBy: string
}): Promise<JobOffersResponse> {
  const response = await axios.post<JobOffersResponse>(
    `${version}/employer/jobs`,
    {
      orderBy: [sortBy],
      // pageNumber: 1,
      pageSize: 100, // TODO: make this dynamic
    }
  )

  return response.data
}

async function DeleteJobOffer(id: string) {
  return await axios.delete(`${version}/job/${id}`)
}

export function useDeleteJobOffer() {
  const queryClient = useQueryClient()
  return useMutation(DeleteJobOffer, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['jobs'])
    },
  })
}
