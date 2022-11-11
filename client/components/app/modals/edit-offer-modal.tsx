import { JobOfferProps } from '@/types'
import { Drawer } from '@mantine/core'
import { useCallback, useMemo, useState } from 'react'

function EditJobOfferModal({
  opened,
  setOpened,
  props,
}: {
  opened: boolean
  setOpened: () => void
  props?: JobOfferProps
}) {
  console.log('props', props)

  return (
    <Drawer
      opened={opened}
      onClose={setOpened}
      title="Edit Job Offer Details"
      padding="xl"
      size="xl"
      position="right"
    ></Drawer>
  )
}

export const useEditJobModal = ({ props }: { props?: JobOfferProps }) => {
  const [showEditOfferModal, setShowEditOfferModal] = useState(false)

  const handleCloseModal = useCallback(() => {
    setShowEditOfferModal(false)
  }, [])

  const EditJobOfferModalCallback = useCallback(() => {
    return (
      <EditJobOfferModal
        opened={showEditOfferModal}
        setOpened={handleCloseModal}
        props={props}
      />
    )
  }, [showEditOfferModal, handleCloseModal, props])

  return useMemo(() => {
    return {
      setShowEditOfferModal,
      EditJobOfferModal: EditJobOfferModalCallback,
    }
  }, [EditJobOfferModalCallback, setShowEditOfferModal])
}

export default EditJobOfferModal
