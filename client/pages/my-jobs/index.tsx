import { DataGrid } from '@/components'
import { RootLayout } from '@/layouts/RootLayout/RootLayout'
import { demoData } from '@/mock/data'
import { deleteOffer } from '@/services/employer-services'
import { NextPageWithLayout } from '@/types'
import { timeAgo } from '@/utils/timeAgo'
import { ActionIcon, Badge, Divider, Group, Title } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { MouseEvent } from 'react'
import { Archive, Edit, Trash } from 'tabler-icons-react'

const renderStatus = (status: number) => {
  switch (status) {
    case 0:
      return <Badge color="orange">Draft</Badge>
    case 1:
      return <Badge color="green">Active</Badge>

    default:
      return <Badge color="red">Close</Badge>
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RenderActions = (record: any) => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation(deleteOffer, {
    onSuccess: () => {
      queryClient.invalidateQueries(['my-jobs'])
      showNotification({
        title: 'Deleted successfully',
        message: 'The job offer has been deleted successfully',
        color: 'green',
      })
    },
  })
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
          mutate(record.id)
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
const MyJobs: NextPageWithLayout = () => (
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
          cell: (info) => (
            <Link href={info.row.original.id}>{info.getValue() as string}</Link>
          ),
          size: 220,
        },
        {
          accessorFn: (row) => row.location,
          accessorKey: 'Location',
          cell: (info) => info.getValue(),
        },
        {
          accessorFn: (row) => row.createdAt,
          accessorKey: 'Created At',
          cell: (info) => timeAgo(info.getValue() as Date),
          size: 100,
        },
        {
          accessorFn: (row) => row.status,
          accessorKey: 'Status',
          cell: (info) => renderStatus(info.getValue() as number),
          size: 80,
        },
        {
          accessorFn: (row) => row.candidates,
          accessorKey: 'Candidates',
          cell: (info) => info.getValue(),
          size: 60,
        },
        {
          id: 'action',
          cell: (props) => RenderActions(props.row.original),
          size: 100,
        },
      ]}
      pageSizes={['10', '20', '50']}
      total={demoData.length}
      fontSize="sm"
      withPagination
      // withRowSelection
      withBoarder
      noEllipsis
    />
  </div>
)

MyJobs.getLayout = (page) => <RootLayout>{page}</RootLayout>
export default MyJobs
