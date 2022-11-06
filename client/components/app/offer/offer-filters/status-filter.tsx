import Popover from '@/components/shared/popover'
import { Menu } from '@mantine/core'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { Check, ChevronDown } from 'tabler-icons-react'
import { useStyles } from './offer-filters.styles'

const statuses = [
  {
    label: 'Active',
    value: 'active',
    color: 'bg-green-500',
  },
  {
    label: 'Closed',
    value: 'closed',
    color: 'bg-amber-500',
  },
  {
    label: 'Draft',
    value: 'draft',
    color: 'bg-amber-500',
  },
  {
    label: 'Archived',
    value: 'archived',
    color: 'bg-gray-400',
  },
]

const statusArrToStr = (newStatusArr: string[]) => {
  if (
    ['active', 'closed', 'draft', 'archived'].every((s) =>
      newStatusArr.includes(s)
    )
  ) {
    return 'all'
  } else if (newStatusArr.length === 0) {
    return 'none'
  } else if (newStatusArr.includes('active') && newStatusArr.length === 1) {
    return 'default'
  } else {
    return newStatusArr.join(',')
  }
}

function StatusFilter() {
  const [openPopover, setOpenPopover] = useState(false)
  const { classes } = useStyles({ opened: openPopover })

  const router = useRouter()
  const { status } = router.query as { status?: string }

  const selectedStatus = useMemo(() => {
    if (!status) {
      return ['active']
    } else if (status === 'all' || status === 'none') {
      return ['active', 'closed', 'draft', 'archived']
    } else {
      return status.split(',')
    }
  }, [status])

  return (
    <Popover
      openPopover={openPopover}
      setOpenPopover={setOpenPopover}
      content={statuses.map(({ label, value }) => (
        <Menu.Item
          key={value}
          onClick={() => {
            let newStatusArr
            if (selectedStatus.includes(value)) {
              if (status === 'none') {
                newStatusArr = [value]
              } else {
                newStatusArr = selectedStatus.filter((s) => s !== value)
              }
            } else {
              newStatusArr = [...selectedStatus, value]
            }

            let newQuery
            if (statusArrToStr(newStatusArr) === 'default') {
              delete router.query.status
              newQuery = { ...router.query }
            } else {
              newQuery = {
                ...router.query,
                status: statusArrToStr(newStatusArr),
              }
            }
            const { ...finalQuery } = newQuery
            router.push({
              pathname: 'my-jobs',
              query: finalQuery,
            })
          }}
          rightSection={
            (status === 'all' ||
              (selectedStatus.includes(value) && status !== 'none')) && (
              <Check size={18} strokeWidth={1.5} />
            )
          }
        >
          {label}
        </Menu.Item>
      ))}
    >
      <button className={classes.target} onClick={() => setOpenPopover(true)}>
        <div className={classes.targetLeft}>
          {/* <ArrowsSort size={18} strokeWidth={1.5} /> */}
          <p>Status</p>
        </div>
        <ChevronDown className={classes.chevron} size={18} strokeWidth={1.5} />
      </button>
    </Popover>
  )
}

export default StatusFilter
