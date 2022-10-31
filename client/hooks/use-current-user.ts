import axios, { version } from '@/utils/axios'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const getProfile = async () => {
  const response = await axios.get(`${version}/profile`).then((res) => res.data)
  return response
}

export const useCurrentUser = () => {
  const [token, setToken] = useState<string | null>(null)
  const router = useRouter()
  const queryClient = useQueryClient()

  const query = useQuery(['user'], getProfile, {
    retry: false,
    enabled: token ? true : false,
  })

  const { isError, error, data } = query

  useEffect(() => {
    if (window === undefined) return

    const t = window.localStorage.getItem('token')

    if (t !== null) {
      setToken(t)
      if (
        isError === true &&
        error?.response?.status === 401 &&
        (router.pathname === '/signin' || router.pathname === '/')
      ) {
        window.localStorage.removeItem('token')
        setToken(null)
        console.log('token removed...❌')
        queryClient.removeQueries()
      } else if (data && router.pathname === '/signin') {
        console.log('redirecting to dashboard...🚀')
        router.replace('/dashboard')
      }
      return
    }
  }, [data, error?.response?.status, isError, router])
  return query
}
