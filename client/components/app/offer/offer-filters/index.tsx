import { Group } from '@mantine/core'
import OfferSort from './offer-sort'
import StatusFilter from './status-filter'

function OfferFilters() {
  return (
    <Group mb="lg">
      <OfferSort />
      <StatusFilter />
    </Group>
  )
}

export default OfferFilters
