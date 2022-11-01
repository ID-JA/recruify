import axios, { version } from '@/utils/axios'
import { useQuery } from '@tanstack/react-query'

// TODO: create a fetch on top of axios
export const getProfile = async () => {
  const response = await axios.get(`${version}/profile`).then((res) => res.data)
  return response
}

const useGetProfile = (token: string | null) => {
  const context = useQuery(['user'], getProfile, {
    enabled: token ? true : false,
    retry: false,
    // staleTime: 30000, // 30 seconds
  })
  return {
    ...context,
    // data: context.data,
    error: context.error?.response?.data,
  }
}

export default useGetProfile
