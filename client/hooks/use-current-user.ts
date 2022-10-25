import { useEffect, useState } from 'react'

export const useCurrentUser = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const u = localStorage.getItem('user')
    if (u) {
      setData(JSON.parse(u))
    }
  }, [])

  return {
    data,
  }
}
