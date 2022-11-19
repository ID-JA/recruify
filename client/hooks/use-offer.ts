import axiosInstance, { version } from '@/utils/axios'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

export const getJobOffer = async (id: string) => {
  const response = await axiosInstance.get(`${version}/job/${id}`)
  return response.data
}

export type Offer = {
  companyName: string
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

  const { data, error } = useQuery<Offer>(['job'], () => getJobOffer(jobId), {
    enabled: !!jobId,
    retry: false,
  })

  return {
    jobId,
    error,
    data,
  }
}

// get offer for candidate
const getOffer = async (id: string) => {
  const response = await axiosInstance.get(`${version}/apply/${id}`)
  return response.data
}

export const useOffer = () => {
  const router = useRouter()

  const { jobId } = router.query as { jobId: string }

  const { data, error } = useQuery<Offer>(
    ['offer', jobId],
    () => getOffer(jobId),
    {
      enabled: !!jobId,
      retry: false,
    }
  )

  return {
    jobId,
    error,
    data,
  }
}
