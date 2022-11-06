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
  status,
}: {
  sortBy: string
  status: string[]
}): Promise<JobOffersResponse> {
  const response = await axios.post<JobOffersResponse>(
    `${version}/employer/jobs`,
    {
      ...getFiltersFromArray(status),
      orderBy: [sortBy],
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

const getFiltersFromArray = (filters: string[]) => {
  if (filters === undefined) {
    return {
      advancedFilter: {
        logic: 'or',
        filters: [
          {
            field: 'status',
            operator: 'eq',
            value: '1',
          },
        ],
      },
    }
  } else if (filters.includes('all') || filters.includes('none')) {
    return
  } else {
    const f = filters.map((filter) => ({
      field: 'status',
      operator: 'eq',
      value: statusStringToNum(filter),
    }))
    return {
      advancedFilter: {
        logic: 'or',
        filters: f,
      },
    }
  }
}

const statusStringToNum = (status: string) => {
  switch (status) {
    case 'draft':
      return '0'
    case 'active':
      return '1'
    case 'closed':
      return '2'
    default:
      return '4'
  }
}
