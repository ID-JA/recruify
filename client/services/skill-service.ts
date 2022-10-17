import axios, { version } from 'utils/axios'

export const getSkillsByTerm = async (term: string) => {
  return await axios.get(`${version}/skill/autocomplete?term=${term}`)
}
