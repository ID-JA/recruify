import axiosInstance, { version } from '@/utils/axios'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

export const getJobOffer = async (id: string) => {
  const response = await axiosInstance.get(`${version}/job/${id}`)
  return response.data
}

export type Offer = {
  employmentType: string
  title: string
  description: string
  companyDescription: string
  location: string
  skills: string[]
  status: number
  createdAt: string
  updatedAt: string
  whyUs: string
  address: string
}

export const useJobOffer = () => {
  const router = useRouter()

  const { jobId } = router.query as { jobId: string }

  const { data, error } = useQuery<Offer>(['offer'], () => getJobOffer(jobId), {
    enabled: !!jobId,
  })

  return {
    jobId,
    error,
    data,
  }
}
