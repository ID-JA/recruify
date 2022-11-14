import { UpdateOfferStatus } from '@/services/employer-services'
import { JobOfferProps } from '@/types'
import { Button, Modal, Text, Title } from '@mantine/core'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback, useMemo, useState } from 'react'

function CloseOfferModal({
  showModal,
  setCloseModal,
  offer,
}: {
  showModal: boolean
  setCloseModal: () => void
  offer: JobOfferProps
}) {
  const queryClient = useQueryClient()
  const mutation = useMutation(UpdateOfferStatus)
  return (
    <Modal
      overlayColor="#fff"
      overlayBlur={2}
      opened={showModal}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onClose={!mutation.isLoading ? setCloseModal : () => {}}
      centered
    >
      <Title order={3} align="center" mb={18}>
        Close job offer <br /> &ldquo;{offer.title}&rdquo;?
      </Title>
      <Text color="gray.7" size="sm" align="center" mb={30}>
        Closing this job offer will remove it from your active job offers. And
        candidates will no longer be able to apply to it.
      </Text>
      <Button
        loading={mutation.isLoading}
        color="gray.9"
        fullWidth
        mt="md"
        onClick={() => {
          mutation.mutate(
            {
              jobId: offer.id,
              status: 'close',
            },
            {
              onSuccess: () => {
                queryClient.invalidateQueries(['jobs'])
                setCloseModal()
              },
            }
          )
        }}
      >
        Close Now
      </Button>
    </Modal>
  )
}

export default CloseOfferModal

export const useCloseJobModal = ({ props }: { props?: JobOfferProps }) => {
  const [showDeleteOfferModal, setShowDeleteOfferModal] = useState(false)
  const handleCloseModal = useCallback(() => {
    setShowDeleteOfferModal(false)
  }, [])
  const handleOpenModal = useCallback(() => {
    setShowDeleteOfferModal(true)
  }, [])
  const CloseJobOfferModalCallback = useCallback(() => {
    return props ? (
      <CloseOfferModal
        showModal={showDeleteOfferModal}
        setCloseModal={handleCloseModal}
        offer={props}
      />
    ) : null
  }, [props, showDeleteOfferModal, handleCloseModal])

  return useMemo(
    () => ({
      openCloseJobModal: handleOpenModal,
      closeDeleteJobModal: handleCloseModal,
      CloseJobOfferModal: CloseJobOfferModalCallback,
    }),
    [handleCloseModal, CloseJobOfferModalCallback, handleOpenModal]
  )
}
