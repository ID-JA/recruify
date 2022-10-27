import {
  ChangePassword,
  MainLayout,
  PersonalInfo,
  ProfileLayout,
} from '@/components'
import { NextPageWithLayout } from '@/types'
import { Divider } from '@mantine/core'

const Details: NextPageWithLayout = () => (
  <>
    <PersonalInfo />
    <Divider my="lg" />
    <ChangePassword />
  </>
)

Details.getLayout = (page) => (
  <MainLayout>
    <ProfileLayout>{page}</ProfileLayout>
  </MainLayout>
)

export default Details
