import { JobOfferProps } from '@/types'
import { timeAgo } from '@/utils'
import {
  ActionIcon,
  Badge,
  CopyButton,
  createStyles,
  Group,
  Menu,
  Paper,
} from '@mantine/core'
import Link from 'next/link'
import {
  Archive,
  Check,
  Copy,
  DotsVertical,
  Edit,
  Trash,
} from 'tabler-icons-react'
import { useDeleteJobModal } from '../modals/delete-offer-modals'

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    padding: `${theme.spacing.lg}px ${theme.spacing.md}px`,
    marginBottom: theme.spacing.md,
  },
  inner: {
    color: 'rgb(107,114,128)',
    // fontWeight: 600,
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
  },
  title: {
    fontWeight: 600,
    textDecoration: 'none',
    color: 'inherit',
  },
  menuItem: {
    color: 'rgb(107,114,128)',
    fontWeight: 600,
  },
  deleteMenuItem: {
    color: 'rgb(220 38 38)',
    fontWeight: 600,
    ':hover': {
      color: '#fff',
      backgroundColor: 'rgb(220 38 38)',
    },
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
}))

function JobOfferCard(props: JobOfferProps) {
  const { candidatesCount, createdAt, id, location, status, title } = props
  const { classes } = useStyles()
  const { DeleteJobOfferModal, openDeleteJobModal } = useDeleteJobModal({
    props,
  })
  return (
    <Paper shadow="xs" className={classes.root}>
      {/* Modals */}
      <DeleteJobOfferModal />
      {/* Card */}
      <StatusMark status={status} />
      <Group position="apart" className={classes.inner}>
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '0.28rem',
            }}
          >
            <Link href={id} passHref>
              <a className={classes.title}>
                <span>{title}</span>
              </a>
            </Link>
            <CopyButton value={`http://localhost:3000/jobs/c/${id}`}>
              {({ copied, copy }) => (
                <ActionIcon
                  size="sm"
                  variant="light"
                  color={copied ? 'teal' : 'gray'}
                  onClick={copy}
                >
                  {copied ? <Check /> : <Copy />}
                </ActionIcon>
              )}
            </CopyButton>
          </div>
          <div>{location}</div>
        </div>

        <Group
          align="center"
          position="apart"
          sx={{
            width: '50%',
          }}
        >
          <div>
            <span>
              {status === 1 ? (
                <Badge color="green">Active</Badge>
              ) : status === 2 ? (
                <Badge color="red">Closed</Badge>
              ) : (
                <Badge color="yellow">Draft</Badge>
              )}
            </span>
          </div>
          <div>
            <span>
              <Badge color="gray">{candidatesCount} Candidates</Badge>
            </span>
          </div>
          <div>
            <span>
              Created {'  '}
              {timeAgo(createdAt)}
            </span>
          </div>
          <Menu shadow="md" width={162} position="bottom-end">
            <Menu.Target>
              <ActionIcon size="sm">
                <DotsVertical />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                icon={<Edit size={18} />}
                className={classes.menuItem}
                onClick={() => {
                  console.log(`edit row with id: ${id}`)
                }}
              >
                Edit
              </Menu.Item>
              <Menu.Item
                icon={<Archive size={18} />}
                className={classes.menuItem}
                onClick={() => {
                  console.log(`archive row with id: ${id}`)
                }}
              >
                Archive
              </Menu.Item>
              <Menu.Item
                icon={<Trash size={18} />}
                color="red"
                className={classes.deleteMenuItem}
                onClick={() => {
                  console.log(`delete row with id: ${id}`)
                  openDeleteJobModal()
                }}
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
    </Paper>
  )
}

export default JobOfferCard

const StatusMark = ({ status }: { status: number }) => {
  return (
    <div
      style={{
        width: '0.35rem',
        display: 'flex',
        position: 'absolute',
        top: '0',
        left: '0',
        height: '100%',
      }}
    >
      <div
        style={{
          width: '0.35rem',
          height: '100%',
          borderTopLeftRadius: '0.2rem',
          borderBottomLeftRadius: '0.2rem',
          backgroundColor:
            status === 1
              ? '#00B87C'
              : status === 2
              ? 'rgb(220 38 38)'
              : 'orange',
        }}
      ></div>
    </div>
  )
}
