import axios, { version } from 'utils/axios'

type JobOffersResponse = {
  data: {
    id: string
    title: string
    location: string
    companyName: string
    createdAt: string
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

export const getJobOffers = async (pageNumber = 1) => {
  return await axios
    .post<JobOffersResponse>(`${version}/employer/jobs`, {
      pageNumber: pageNumber,
      pageSize: 10,
    })
    .then((res) => res.data)
}

export const deleteOffer = async (id: string) => {
  return await axios.delete(`${version}/job/${id}`)
}
