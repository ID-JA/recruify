/* eslint-disable @typescript-eslint/no-empty-function */
import { useDeleteJobOffer } from '@/services/employer-services'
import { JobOfferProps } from '@/types'
import { Button, Modal, Text, Title } from '@mantine/core'
import { useCallback, useEffect, useMemo, useState } from 'react'

// we use this model to confirm the deletion of a job offer
export function DeleteJobOfferModal({
  showModal,
  setCloseModal,
  props,
}: {
  showModal: boolean
  setCloseModal: () => void
  props: JobOfferProps
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
      onClose={!mutation.isLoading ? setCloseModal : () => {}}
      withCloseButton={false}
      centered
    >
      <Title order={3} align="center" mb={18}>
        Delete job offer &ldquo;{props.title}&rdquo;?
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
          mutation.mutate(props.id)
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
        props={props}
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
