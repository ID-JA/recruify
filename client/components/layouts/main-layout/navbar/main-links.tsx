import {
  Briefcase,
  Dashboard,
  Messages,
  Plus,
  Settings,
  Users,
} from 'tabler-icons-react'

const mainLinksArr = [
  {
    to: '/my-jobs/create',
    label: 'Post a Job',
    icon: Plus,
    released: true,
  },
  {
    to: '/dashboard',
    label: 'Dashboard',
    icon: Dashboard,
    released: true,
  },
  {
    to: '/candidates',
    label: 'Candidates',
    icon: Users,
    released: true,
  },
  {
    to: '/my-jobs',
    label: 'Jobs',
    icon: Briefcase,
    released: true,
  },
  {
    to: '/settings/user-details',
    label: 'Settings',
    icon: Settings,
    released: true,
  },
  {
    to: '/messages',
    label: 'Messages',
    icon: Messages,
    released: false,
  },
]

export default mainLinksArr
