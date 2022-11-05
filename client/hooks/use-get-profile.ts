import axios, { version } from '@/utils/axios'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

// TODO: create a fetch on top of axios
export const getProfile = async () => {
  const response = await axios.get(`${version}/profile`).then((res) => res.data)
  return response
}

const useGetProfile = <T>(config?: UseQueryOptions<T, Error, T>) => {
  const [token, setToken] = useState<string | null>(null)
  const router = useRouter()

  const context = useQuery<T, Error, T>(['user'], getProfile, {
    enabled: !!token,
    retry: false,
    staleTime: 30000, // 30 seconds
    ...config,
  })

  useEffect(() => {
    if (window !== undefined && window.localStorage.getItem('token')) {
      setToken(window.localStorage.getItem('token'))
    } else if (
      !window.localStorage.getItem('token') &&
      router.pathname !== '/'
    ) {
      router.push('/signin')
    }
  }, [router])

  return {
    ...context,
  }
}

export default useGetProfile
