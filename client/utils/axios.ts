import axios from 'axios'

export const version = 'v1'
export const baseURL = 'https://localhost:7112/api'

const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? process.env.HOST : baseURL,
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
