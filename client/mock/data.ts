import { v4 as uuidv4 } from 'uuid'

export interface ProfessionalSkillOption {
  readonly value: string
  readonly label: string
}

// method to convert array of strings to array of objects with value and label
export const convertToProfessionalSkillOptions = (arr: string[]) => {
  return arr?.map((element) => {
    return {
      value: element,
      label: element,
    }
  })
}

export type Job = {
  id: string
  title: string
  location: string
  company: string
  createdAt: string
  createdBy: string
  status: string
  candidates: number
  visitors: number
}

// const newJob = (): Job => {
//   return {
//     id: faker.datatype.uuid(),
//     title: faker.name.jobTitle(),
//     company: faker.company.name(),
//     location: faker.address.cityName(),
//     createdAt: '20/02/2020',
//     createdBy: faker.name.fullName(),
//     candidates: faker.datatype.number({
//       max: 20,
//       min: 0,
//     }),
//     visitors: faker.datatype.number({
//       max: 20,
//       min: 0,
//     }),
//     status: faker.helpers.arrayElement(['draft', 'active', 'unknown']),
//   }
// }

export const demoData: Job[] = [
  {
    id: uuidv4(),
    title: 'JavaScript developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'draft',
    candidates: 5,
    visitors: 20,
  },
  {
    id: uuidv4(),
    title: 'JavaScript developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'draft',
    candidates: 5,
    visitors: 20,
  },
  {
    id: uuidv4(),
    title: 'Data Analytic Engineer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'active',
    candidates: 5,
    visitors: 12,
  },
  {
    id: uuidv4(),
    title: 'Back end developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'blabla', // should render as badge
    candidates: 0,
    visitors: 2,
  },
  {
    id: uuidv4(),
    title: 'Back end developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'blabla', // should render as badge
    candidates: 0,
    visitors: 2,
  },
  {
    id: uuidv4(),
    title: 'Back end developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'blabla', // should render as badge
    candidates: 0,
    visitors: 2,
  },
  {
    id: uuidv4(),
    title: 'Back end developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'blabla', // should render as badge
    candidates: 0,
    visitors: 2,
  },
  {
    id: uuidv4(),
    title: 'Back end developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'blabla', // should render as badge
    candidates: 0,
    visitors: 2,
  },
  {
    id: uuidv4(),
    title: 'Back end developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'blabla', // should render as badge
    candidates: 0,
    visitors: 2,
  },
  {
    id: uuidv4(),
    title: 'Back end developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'blabla', // should render as badge
    candidates: 0,
    visitors: 2,
  },
  {
    id: uuidv4(),
    title: 'Back end developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'blabla', // should render as badge
    candidates: 0,
    visitors: 2,
  },
  {
    id: uuidv4(),
    title: 'Back end developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'blabla', // should render as badge
    candidates: 0,
    visitors: 2,
  },
  {
    id: uuidv4(),
    title: 'Back end developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'blabla', // should render as badge
    candidates: 0,
    visitors: 2,
  },
  {
    id: uuidv4(),
    title: 'Back end developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'blabla', // should render as badge
    candidates: 0,
    visitors: 2,
  },
  {
    id: uuidv4(),
    title: 'DotNet developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'blabla', // should render as badge
    candidates: 0,
    visitors: 2,
  },
]
