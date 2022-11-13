import axios from 'axios'

export const version = 'v1'
export const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'http://lockas-001-site1.dtempurl.com/api'
    : 'http://localhost:7112/api'

const axiosInstance = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json', charset: 'utf-8' },
})

// Set the AUTH token for any request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (config.headers && token) {
    config.headers.Authorization = token ? `Bearer ${token}` : ''
  }

  return config
})

export default axiosInstance
