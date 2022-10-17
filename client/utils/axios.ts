import axios from 'axios'

export const version = 'v1'
export const baseURL = 'https://localhost:7112/api'

export default axios.create({
  baseURL: baseURL,
  headers: {
    'Content-type': 'application/json',
  },
})
