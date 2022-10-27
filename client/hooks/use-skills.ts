import { convertToProfessionalSkillOptions } from '@/mock/data'
import axios, { version } from '@/utils/axios'
import { useQuery } from '@tanstack/react-query'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchSkills: any = (skillName: string) => {
  return axios
    .get<string[]>(`${version}/skill/autocomplete?term=${skillName}`)
    .then((res) => convertToProfessionalSkillOptions(res.data))
}

export const useSkills = (term: string) => {
  return useQuery(['skills', term], () => fetchSkills(term), {
    enabled: term.length >= 2,
  })
}
