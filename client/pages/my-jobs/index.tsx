import { ActionIcon, Badge, Divider, Group, Title } from '@mantine/core'
import { MouseEvent } from 'react'
import { Archive, Edit, Trash } from 'tabler-icons-react'
import { MainLayout, DataGrid } from '~/components'
import { demoData, Job } from '~/mock/data'
import { NextPageWithLayout } from '../_app'

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

const renderActions = (record: Job) => {
  return (
    <Group spacing={4} position="center">
      <ActionIcon
        aria-label="edit record"
        color="blue"
        onClick={(e: MouseEvent<HTMLButtonElement>): void => {
          e.stopPropagation()
          console.log(`edit row with id: ${record.id}`)
        }}
      >
        <Edit size={16} />
      </ActionIcon>
      <ActionIcon
        aria-label="delete record"
        color="red"
        onClick={(e: MouseEvent<HTMLButtonElement>): void => {
          e.stopPropagation()
          console.log(`delete row with id: ${record.id}`)
        }}
      >
        <Trash size={16} />
      </ActionIcon>
      <ActionIcon
        aria-label="archive record"
        color="orange"
        onClick={(e: MouseEvent<HTMLButtonElement>): void => {
          e.stopPropagation()
          console.log(`archive row with id: ${record.id}`)
        }}
      >
        <Archive size={16} />
      </ActionIcon>
    </Group>
  )
}
const MyJobs: NextPageWithLayout = () => {
  return (
    <div>
      <Group align="center">
        <Title order={1} weight={600}>
          Jobs
        </Title>
      </Group>
      <Divider my="md" />
      <DataGrid
        data={demoData}
        columns={[
          {
            accessorFn: (row) => row.title,
            accessorKey: 'Title',
            cell: (info) => info.getValue(),
            size: 220,
          },

          {
            accessorFn: (row) => row.company,
            accessorKey: 'Company',
            cell: (info) => info.getValue(),
            size: 200,
          },

          {
            accessorFn: (row) => row.location,
            accessorKey: 'Location',
            cell: (info) => info.getValue(),
          },
          {
            accessorFn: (row) => row.createdAt,
            accessorKey: 'Created At',
            cell: (info) => info.getValue(),
            size: 100,
          },
          {
            accessorFn: (row) => row.createdBy,
            accessorKey: 'Created By',
            cell: (info) => info.getValue(),
            size: 120,
          },

          {
            accessorFn: (row) => row.status,
            accessorKey: 'Status',
            cell: (info) => renderStatus(info.getValue() as string),
            size: 80,
          },
          {
            accessorFn: (row) => row.visitors,
            accessorKey: 'Visitors',
            cell: (info) => info.getValue(),
            size: 50,
          },

          {
            accessorFn: (row) => row.candidates,
            accessorKey: 'Candidates',
            cell: (info) => info.getValue(),
            size: 60,
          },
          {
            id: 'action',
            cell: (props) => renderActions(props.row.original),
            size: 100,
          },
        ]}
        total={demoData.length}
        fontSize="sm"
        withPagination
        withRowSelection
        withBoarder
        noEllipsis
      />
    </div>
  )
}

MyJobs.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>
}

export default MyJobs
