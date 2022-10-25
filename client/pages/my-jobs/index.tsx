import { ActionIcon, Badge, Divider, Group, Title } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { MouseEvent, useState } from 'react'
import { Archive, Edit, Trash } from 'tabler-icons-react'
import { DataGrid, MainLayout } from '~/components'
import { deleteOffer, getJobOffers } from '~/services/employer-services'
import { timeAgo } from '~/utils/timeAgo'
import { NextPageWithLayout } from '../_app'

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
const MyJobs: NextPageWithLayout = () => {
  const [page, setPage] = useState(1)

  const { data, isLoading } = useQuery(['my-jobs'], () => getJobOffers(page), {
    refetchOnWindowFocus: false,
  })

  return (
    <div>
      <Group align="center">
        <Title order={1} weight={600}>
          Jobs
        </Title>
      </Group>
      <Divider my="md" />
      {isLoading ? (
        <div>Loading...</div>
      ) : !data?.data ? (
        <div>NO Job offer yet</div>
      ) : (
        <DataGrid
          data={data.data}
          columns={[
            {
              accessorFn: (row) => row.title,
              accessorKey: 'Title',
              cell: (info) => info.getValue(),
              size: 220,
            },

            // {
            //   accessorFn: (row) => row.companyName,
            //   accessorKey: 'Company',
            //   cell: (info) => info.getValue(),
            //   size: 200,
            // },

            {
              accessorFn: (row) => row.location,
              accessorKey: 'Location',
              cell: (info) => info.getValue(),
            },
            {
              accessorFn: (row) => row.createdAt,
              accessorKey: 'Created',
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
              accessorFn: (row) => row.candidatesCount,
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
          onPageChange={(page) => setPage(page.pageIndex + 1)}
          pageSizes={['10', '20', '50']}
          total={data.totalCount}
          fontSize="sm"
          withPagination
          withRowSelection
          withBoarder
          noEllipsis
          initialState={{
            pagination: {
              pageSize: data.pageSize,
              pageIndex: data.currentPage - 1,
            },
          }}
        />
      )}
    </div>
  )
}

MyJobs.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>
}

export default MyJobs

// export const timeAgo = (date: string) => {
//   const time = new Date(date).getTime()
//   const now = new Date().getTime()
//   const diff = now - time
//   const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24))
//   const diffInHours = Math.floor(diff / (1000 * 60 * 60))
//   const diffInMinutes = Math.floor(diff / (1000 * 60))
//   const diffInSeconds = Math.floor(diff / 1000)

//   if (diffInDays > 0) {
//     return `${diffInDays} days ago`
//   }
//   if (diffInHours > 0) {
//     return `${diffInHours} hours ago`
//   }
//   if (diffInMinutes > 0) {
//     return `${diffInMinutes} minutes ago`
//   }
//   if (diffInSeconds > 0) {
//     return `${diffInSeconds} seconds ago`
//   }
//   return 'Just now'
// }
