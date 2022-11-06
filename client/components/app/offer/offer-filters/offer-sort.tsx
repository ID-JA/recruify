import Popover from '@/components/shared/popover'
import { Menu } from '@mantine/core'

import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import {
  ArrowsSort,
  Check,
  ChevronDown,
  SortDescending2,
} from 'tabler-icons-react'

import { useStyles } from './offer-filters.styles'

const sortOptions = [
  {
    label: 'Date posted',
    value: 'createdAt',
  },
  {
    label: 'N° of candidates',
    value: 'candidatesCount',
  },
]

function OfferSort() {
  const router = useRouter()
  const [opened, setOpened] = useState<boolean>(false)
  const { classes } = useStyles({ opened })

  const { sort } = router.query as { sort?: string }

  const selectedSort = useMemo(() => {
    return sortOptions.find((s) => s.value === sort) || sortOptions[0]
  }, [sort])

  return (
    <Popover
      openPopover={opened}
      setOpenPopover={setOpened}
      content={sortOptions.map((option) => (
        <Menu.Item
          className={classes.item}
          onClick={() => {
            let newQuery
            newQuery = {
              ...router.query,
              sort: option.value,
            } as Partial<{ sort: string }>

            if (option.value === 'createdAt') {
              delete newQuery.sort
            }

            const { ...finalQuery } = newQuery
            router.push({
              pathname: 'my-jobs',
              query: finalQuery,
            })
          }}
          key={option.value}
          icon={<SortDescending2 size={18} strokeWidth={1.5} />}
          rightSection={
            selectedSort.value === option.value && (
              <Check size={18} strokeWidth={1.5} />
            )
          }
        >
          {option.label}
        </Menu.Item>
      ))}
    >
      <button className={classes.target} onClick={() => setOpened(true)}>
        <div className={classes.targetLeft}>
          <ArrowsSort size={18} strokeWidth={1.5} />
          <p>Sort by</p>
        </div>
        <ChevronDown className={classes.chevron} size={18} strokeWidth={1.5} />
      </button>
    </Popover>
  )
}

export default OfferSort
