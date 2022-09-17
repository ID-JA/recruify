import {Dashboard, Users, Briefcase, Mail} from 'tabler-icons-react'

const mainLinksArr = [
  {
    to: '/dashboard',
    label: 'Dashboard',
    icon: Dashboard,
  },
  {
    to: '/candidates',
    label: 'Candidates',
    icon: Users,
  },
  {
    to: '/my-jobs',
    label: 'Jobs',
    icon: Briefcase,
  },
  {
    to: '/messages',
    label: 'Messages',
    icon: Mail,
  },
]

export default mainLinksArr
