import { Badge } from '@mantine/core'
import AppLayout from '../../components/AppLayout/AppLayout'
import { DataGrid } from '../../components/DataGrid'
import { NextPageWithLayout } from '../_app'

const MOCK_JOBS = [
  {
    id: 1,
    title: 'JavaScript developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'draft',
    candidate: 5,
    visitors: 20,
  },
  {
    id: 2,
    title: 'Data Analytic Engineer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'draft',
    candidate: 5,
    visitors: 12,
  },
  {
    id: 3,
    title: 'Back end developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'draft',
    candidate: 0,
    visitors: 2,
  },
]

const MyJobs: NextPageWithLayout = () => {
  return (
    <>
      <DataGrid
        columns={[
          {
            accessor: 'title',
            title: 'Title',
          },
          {
            accessor: 'location',
            title: 'Location',
          },
          {
            accessor: 'company',
            title: 'Company',
          },
          {
            accessor: 'createdAt',
            title: 'Created At',
          },
          {
            accessor: 'status',
            title: 'Status',
            render: ({ status }) => (
              <Badge color="orange" size="md">
                {status}
              </Badge>
            ),
          },
          {
            accessor: 'createdBy',
            title: 'Created By',
          },
          {
            accessor: 'candidate',
            title: 'Candidate',
          },
          {
            accessor: 'visitors',
            title: 'Visitors',
          },
        ]}
        data={MOCK_JOBS}
      />
    </>
  )
}

MyJobs.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>
}

export default MyJobs
