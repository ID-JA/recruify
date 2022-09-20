import { Divider } from '@mantine/core'
import AppLayout from '../../components/AppLayout/AppLayout'
import ChangePassword from '../../components/AppSettings/UserSettings/ChangePassword'
import GeneralInformation from '../../components/AppSettings/UserSettings/PersonalInfo'
import ProfileLayout from '../../components/ProfileLayout/ProfileLayout'
import { NextPageWithLayout } from '../_app'

const Details: NextPageWithLayout = () => {
  return (
    <>
      <GeneralInformation />
      <Divider my="lg" />
      <ChangePassword />
    </>
  )
}

Details.getLayout = (page) => {
  return (
    <AppLayout>
      <ProfileLayout>{page}</ProfileLayout>
    </AppLayout>
  )
}
export default Details
