import { Badge, Checkbox } from '@mantine/core'
import { v4 as uuidv4 } from 'uuid'

import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { Edit, Trash } from 'tabler-icons-react'
import AppLayout from '../../components/AppLayout/AppLayoutInner'
import { DataGrid } from '../../components/DataGrid'
import { NextPageWithLayout } from '../_app'

// Create a type for data
type Job = {
  id: string
  title: string
  location: string
  company: string
  createdAt: string
  createdBy: string
  status: string
  candidates: number
  employees: number
}

const MOCK_JOBS: Job[] = [
  {
    id: uuidv4(),
    title: 'JavaScript developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'draft',
    candidates: 5,
    employees: 20,
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
    employees: 12,
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
    employees: 2,
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
    employees: 2,
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
    employees: 2,
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
    employees: 2,
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
    employees: 2,
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
    employees: 2,
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
    employees: 2,
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
    employees: 2,
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
    employees: 2,
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
    employees: 2,
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
    employees: 2,
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
    employees: 2,
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
  const [rowSelection, setRowSelection] = useState({})
  const columns = useMemo<ColumnDef<Job>[]>(
    () => [
      {
        accessorKey: 'select',
        header: ({ table }) => {
          // TODO: Check if there's any way to remove this handler
          const handleHeaderSelectionChange = () => {
            const value =
              (!table.getIsAllRowsSelected() &&
                table.getIsSomePageRowsSelected()) ||
              !table.getIsAllPageRowsSelected()
            console.log(value)

            table.toggleAllPageRowsSelected(value)
          }
          return (
            <Checkbox
              sx={{
                cursor: 'pointer',
              }}
              {...{
                checked: table.getIsAllPageRowsSelected(),
                indeterminate:
                  !table.getIsAllPageRowsSelected() &&
                  table.getIsSomePageRowsSelected(),
                onChange: handleHeaderSelectionChange,
              }}
              onClick={(e) => e.stopPropagation()}
            />
          )
        },

        cell: ({ row }) => (
          <Checkbox
            sx={{
              cursor: 'pointer',
            }}
            {...{
              checked: row.getIsSelected(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
            onClick={(e) => e.stopPropagation()}
          />
        ),
      },
      {
        id: 'title',
        accessorFn: (row) => row.title,
        accessorKey: 'Title',
        cell: (info) => info.getValue(),
      },

      {
        accessorFn: (row) => row.company,
        accessorKey: 'Company',
        cell: (info) => info.getValue(),
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
      },
      {
        accessorFn: (row) => row.createdBy,
        accessorKey: 'Created By',
        cell: (info) => info.getValue(),
      },

      {
        accessorFn: (row) => row.status,
        accessorKey: 'Status',
        cell: (info) => renderStatus(info.getValue() as string),
      },
      {
        accessorFn: (row) => row.employees,
        accessorKey: 'Employees',
        cell: (info) => info.getValue(),
      },

      {
        accessorFn: (row) => row.candidates,
        accessorKey: 'Candidates',
        cell: (info) => info.getValue(),
      },
    ],
    []
  )

  const table = useReactTable({
    data: MOCK_JOBS,
    columns,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const handleRowClick = (record: Job) => {
    console.log(record)
  }

  const handlePageChange = (pageNumber: number) => {
    table.setPageIndex(pageNumber - 1)
  }

  return (
    <div>
      <DataGrid
        table={table}
        onRowClick={(record) => handleRowClick(record)}
        page={table.getState().pagination.pageIndex + 1}
        onPageChange={handlePageChange}
        recordsPerPage={10}
        paginationSize="sm"
        totalRecords={table.getCoreRowModel().rows.length}
        rowContextMenu={{
          items: ({ id, title, company }) => {
            return [
              {
                key: 'edit',
                icon: <Edit size={14} />,
                title: `Edit ${title}`,
                onClick: () =>
                  console.log(
                    `you want to edit ${title} - ${company} job post`
                  ),
              },
              {
                key: 'delete',
                icon: <Trash size={14} />,
                title: `Delete ${title}`,
                color: 'red',
                onClick: () =>
                  console.log(
                    `you want to delete ${title} - ${company} job post`
                  ),
              },
              { key: 'divider-1', divider: true },
              {
                key: 'deleteMany',
                hidden:
                  table.getSelectedRowModel().flatRows.length <= 1 ||
                  !table
                    .getSelectedRowModel()
                    .rows.map((r) => r.original.id)
                    .includes(id),
                title: `Delete ${
                  table.getSelectedRowModel().flatRows.length
                } selected records`,
                icon: <Trash size={14} />,
                color: 'red',
                onClick: () =>
                  console.log(
                    `you want to delete ${
                      table.getSelectedRowModel().flatRows.length
                    } records`
                  ),
              },
            ]
          },
        }}
      />
    </div>
  )
}

MyJobs.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>
}

export default MyJobs
