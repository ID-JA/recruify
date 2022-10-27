import axios, { version } from '@/utils/axios'
import { useQuery } from '@tanstack/react-query'

export const getProfile = async () => {
  const response = await axios.get(`${version}/profile/validate`)
  return response.data
}

export const useCurrentUser = () => {
  return useQuery(['currentUser'], getProfile)
}
