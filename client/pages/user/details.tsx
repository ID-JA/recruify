import { Divider } from '@mantine/core'
import { NextPageWithLayout } from '../_app'
import {
  ProfileLayout,
  MainLayout,
  PersonalInfo,
  ChangePassword,
} from '~/components'

const Details: NextPageWithLayout = () => {
  return (
    <>
      <PersonalInfo />
      <Divider my="lg" />
      <ChangePassword />
    </>
  )
}

Details.getLayout = (page) => {
  return (
    <MainLayout>
      <ProfileLayout>{page}</ProfileLayout>
    </MainLayout>
  )
}
export default Details
