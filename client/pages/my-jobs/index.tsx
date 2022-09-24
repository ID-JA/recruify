import { Badge } from '@mantine/core'
import { createColumnHelper } from '@tanstack/react-table'
import AppLayout from '../../components/AppLayout/AppLayout'
import { DataGrid } from '../../components/DataGrid'
import { NextPageWithLayout } from '../_app'

// [
//   {
//     accessor: 'title',
//     title: 'Title',
//   },
//   {
//     accessor: 'location',
//     title: 'Location',
//   },
//   {
//     accessor: 'company',
//     title: 'Company',
//   },
//   {
//     accessor: 'createdAt',
//     title: 'Created At',
//   },
//   {
//     accessor: 'status',
//     title: 'Status',
//     render: ({ status }) => (
//       <Badge color="orange" size="md">
//         {status}
//       </Badge>
//     ),
//   },
//   {
//     accessor: 'createdBy',
//     title: 'Created By',
//   },
//   {
//     accessor: 'candidates',
//     title: 'Candidate',
//   },
//   {
//     accessor: 'visitors',
//     title: 'Visitors',
//   },
// ]

// Create a type for data
type Job = {
  id: number
  title: string
  location: string
  company: string
  createdAt: string
  createdBy: string
  status: string
  candidates: number
  visitors: number
}

const MOCK_JOBS: Job[] = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
    title: 'Back end developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'blabla', // should render as badge
    candidates: 0,
    visitors: 2,
  },
]

// TODO: Render badge component base on status
const renderStatus = (status: string) => {
  switch (status) {
    case 'draft':
      return <Badge color="orange">{status}</Badge>
    case 'active':
      return <Badge color="green">{status}</Badge>

    default:
      return <Badge color="red">Unknown</Badge>
  }
}

const MyJobs: NextPageWithLayout = () => {
  const columnHelper = createColumnHelper<Job>()

  const columns = [
    columnHelper.accessor('title', {
      header: 'Title',
      cell: (c) => c.renderValue(),
    }),
    columnHelper.accessor('company', {
      header: 'Company',
      cell: (c) => c.renderValue(),
    }),
    columnHelper.accessor('location', {
      header: 'Location',
      cell: (c) => c.renderValue(),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (c) => renderStatus(c.getValue()),
    }),
    columnHelper.accessor('createdAt', {
      header: 'Created At',
      cell: (c) => c.renderValue(),
    }),
    columnHelper.accessor('createdBy', {
      header: 'Created By',
      cell: (c) => c.renderValue(),
    }),
    columnHelper.accessor('visitors', {
      header: 'Visitors',
      cell: (c) => c.renderValue(),
    }),
    columnHelper.accessor('candidates', {
      header: 'Candidates',
      cell: (c) => c.renderValue(),
    }),
  ]

  return (
    <>
      <DataGrid columns={columns} data={MOCK_JOBS} />
    </>
  )
}

MyJobs.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>
}

export default MyJobs
