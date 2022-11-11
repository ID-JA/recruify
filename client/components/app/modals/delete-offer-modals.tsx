import { useDeleteJobOffer } from '@/services/employer-services'
import { JobOfferProps } from '@/types'
import { Button, Modal, Text, Title } from '@mantine/core'
import { useCallback, useEffect, useMemo, useState } from 'react'

// we use this model to confirm the deletion of a job offer
export function DeleteJobOfferModal({
  showModal,
  setCloseModal,
  offer,
}: {
  showModal: boolean
  setCloseModal: () => void
  offer: JobOfferProps
}) {
  const mutation = useDeleteJobOffer()

  useEffect(() => {
    if (mutation.isSuccess) {
      setCloseModal()
    }
  }, [mutation.isSuccess, setCloseModal])

  return (
    <Modal
      overlayColor="#fff"
      overlayBlur={2}
      opened={showModal}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onClose={!mutation.isLoading ? setCloseModal : () => {}}
      withCloseButton={false}
      centered
    >
      <Title order={3} align="center" mb={18}>
        Delete job offer &ldquo;{offer.title}&rdquo;?
      </Title>
      <Text color="gray.7" align="center" mb={30}>
        Deleting this job offer will remove all applications and data related to
        it.
      </Text>
      <Button
        loading={mutation.isLoading}
        color="red"
        fullWidth
        mt="md"
        onClick={() => {
          mutation.mutate(offer.id)
        }}
      >
        Delete Now
      </Button>
    </Modal>
  )
}

export const useDeleteJobModal = ({ props }: { props?: JobOfferProps }) => {
  const [showDeleteOfferModal, setShowDeleteOfferModal] = useState(false)
  const handleCloseModal = useCallback(() => {
    setShowDeleteOfferModal(false)
  }, [])
  const handleOpenModal = useCallback(() => {
    setShowDeleteOfferModal(true)
  }, [])
  const DeleteJobOfferModalCallback = useCallback(() => {
    return props ? (
      <DeleteJobOfferModal
        showModal={showDeleteOfferModal}
        setCloseModal={handleCloseModal}
        offer={props}
      />
    ) : null
  }, [props, showDeleteOfferModal, handleCloseModal])

  return useMemo(
    () => ({
      openDeleteJobModal: handleOpenModal,
      closeDeleteJobModal: handleCloseModal,
      DeleteJobOfferModal: DeleteJobOfferModalCallback,
    }),
    [handleCloseModal, DeleteJobOfferModalCallback, handleOpenModal]
  )
}
