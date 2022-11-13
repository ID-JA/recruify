import Popover from '@/components/shared/popover'
import {
  getJobCandidatesCount,
  UpdateOfferStatus,
} from '@/services/employer-services'
import { JobOfferProps } from '@/types'
import { timeAgo } from '@/utils'
import {
  ActionIcon,
  Badge,
  createStyles,
  Group,
  Loader,
  MediaQuery,
  Menu,
  Paper,
} from '@mantine/core'
import { NextLink } from '@mantine/next'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useState } from 'react'
import { Archive, DotsVertical, Edit, Trash, Upload } from 'tabler-icons-react'
import { useCloseJobModal } from '../modals/close-offer-modal'
import { useDeleteJobModal } from '../modals/delete-offer-modals'

const useStyles = createStyles((theme, { status }: { status: number }) => ({
  root: {
    position: 'relative',
    padding: `${theme.spacing.lg}px ${theme.spacing.md}px`,
    marginBottom: theme.spacing.md,
  },
  inner: {
    color: 'rgb(107,114,128)',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 600,
    textDecoration: 'none',
    display: 'block',
    color: 'inherit',
    '&:hover': {
      textDecoration: 'underline',
    },
    marginBottom: '0.25rem',
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

  statusMarker: {
    marginTop: '5px',
    marginRight: '8px',
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor:
      status === 1 ? '#00B87C' : status === 2 ? 'rgb(220 38 38)' : 'orange',
  },
}))
// TODO: fix sort by nbr of candidates
function JobOfferCard(props: JobOfferProps) {
  const { createdAt, id, location, status, title } = props
  const [openPopover, setOpenPopover] = useState(false)
  const queryClient = useQueryClient()
  const { classes } = useStyles({ status })

  const { CloseJobOfferModal, openCloseJobModal } = useCloseJobModal({ props })
  const { DeleteJobOfferModal, openDeleteJobModal } = useDeleteJobModal({
    props,
  })

  const { data, isFetching } = useQuery<number>(
    ['candidatesCount', id],
    () => getJobCandidatesCount(id),
    {
      retry: false,
      keepPreviousData: true,
      staleTime: 10000,
      refetchOnWindowFocus: true,
    }
  )

  const mutation = useMutation(UpdateOfferStatus)

  return (
    <Paper shadow="xs" className={classes.root}>
      <CloseJobOfferModal />
      <DeleteJobOfferModal />
      <div className={classes.inner}>
        <div
          style={{
            display: 'flex',
            gap: '8px',
          }}
        >
          {/* <Tooltip
            color="gray"
            label={
              status === 1
                ? 'Active'
                : status === 2
                ? 'Closed'
                : status === 3
                ? 'Archived'
                : 'Draft'
            }
          >
            <span className={classes.statusMarker} />
          </Tooltip> */}
          <div>
            <Link href={`/my-jobs/${id}`} passHref>
              <a className={classes.title}>{title}</a>
            </Link>
            <p>{location}</p>
          </div>
        </div>

        <Group align="center" position="right" spacing="xl">
          <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
            {status === 1 ? (
              <Badge color="green">Active</Badge>
            ) : status === 2 ? (
              <Badge color="red">Closed</Badge>
            ) : (
              <Badge color="yellow">Draft</Badge>
            )}
          </MediaQuery>
          <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
            <Badge color="gray">
              {isFetching ? (
                <Loader color="gray" size="sm" variant="dots" />
              ) : (
                data
              )}
              <span style={{ marginLeft: '5px' }}>Candidates</span>
            </Badge>
          </MediaQuery>
          <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
            <div>
              Created {'  '}
              {timeAgo(createdAt)}
            </div>
          </MediaQuery>

          <Popover
            openPopover={openPopover}
            setOpenPopover={setOpenPopover}
            content={
              <>
                {status === 0 && (
                  <Menu.Item
                    color="green"
                    key="post-job-now"
                    icon={<Upload size={18} />}
                    style={{ fontWeight: 600 }}
                    onClick={() => {
                      mutation.mutate(
                        { jobId: id, status: 'publish' },
                        {
                          onSuccess: () => {
                            queryClient.invalidateQueries(['jobs'])
                          },
                        }
                      )
                    }}
                  >
                    Post job
                  </Menu.Item>
                )}

                <Menu.Item
                  component={NextLink}
                  passHref
                  href={`/my-jobs/${id}/edit`}
                  icon={<Edit size={18} />}
                  className={classes.menuItem}
                >
                  Edit
                </Menu.Item>
                {status !== 2 && (
                  <Menu.Item
                    key="close-offer"
                    icon={<Archive size={18} />}
                    className={classes.menuItem}
                    onClick={() => {
                      console.log(`archive row with id: ${id}`)
                      openCloseJobModal()
                    }}
                  >
                    Archive
                  </Menu.Item>
                )}
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
              </>
            }
          >
            <ActionIcon size="sm" onClick={() => setOpenPopover(true)}>
              <DotsVertical />
            </ActionIcon>
          </Popover>
        </Group>
      </div>
    </Paper>
  )
}

export default JobOfferCard
