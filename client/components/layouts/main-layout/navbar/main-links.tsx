import { Briefcase, Dashboard, Plus, Settings, Users } from 'tabler-icons-react'

const mainLinksArr = [
  {
    to: '/my-jobs/create',
    label: 'Post a Job',
    icon: Plus,
  },
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
    to: '/settings/user-details',
    label: 'Settings',
    icon: Settings,
  },
]

export default mainLinksArr
