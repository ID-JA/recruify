import axios from 'utils/axios'

export const signupEmployer = async (employer: unknown) => {
  return await axios.post('auth/self-register', employer)
}
