import {Briefcase, Dashboard, Mail, Settings, Users} from 'tabler-icons-react'

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
  {
    to: '/settings',
    label: 'Settings',
    icon: Settings,
  },
]

export default mainLinksArr
