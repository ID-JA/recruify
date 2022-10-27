import axios from 'axios'

export const version = 'v1'
export const baseURL = 'https://localhost:7112/api'

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-type': 'application/json',
  },
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
