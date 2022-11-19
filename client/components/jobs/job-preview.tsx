import { Offer } from '@/hooks/use-offer'
import { Alert, Container, Tabs, Text, Title } from '@mantine/core'
import AppLyForm from './apply-form/ApplyFrom'

const formatEmploymentType = (type: string) => {
  switch (type) {
    case 'full_time':
      return 'Full Time'
    case 'part_time':
      return 'Part Time'
    case 'contract':
      return 'Contract'
    case 'internship':
      return 'Internship'
    case 'temporary':
      return 'Temporary'
    default:
      return 'Unknown'
  }
}

function JobPreview({ offer }: { offer: Offer }) {
  return (
    <Container>
      <Title order={2}>{offer?.title}</Title>
      <div style={{ display: 'grid', gridTemplateColumns: '.4fr 1fr' }}>
        <div
          style={{
            marginTop: '60px',
          }}
        >
          <div
            style={{
              padding: '16px 0px',
            }}
          >
            <Title order={2} size={12} color="gray" mb={6}>
              Company
            </Title>
            <Text color="gray.8">{offer?.companyName}</Text>
          </div>
          <div
            style={{
              padding: '16px 0px',
            }}
          >
            <Title order={2} size={12} color="gray" mb={6}>
              Location
            </Title>
            <Text color="gray.8">{offer?.address}</Text>
          </div>
          <div
            style={{
              padding: '16px 0px',
            }}
          >
            <Title order={2} size={12} color="gray" mb={6}>
              Type
            </Title>
            <Text color="gray.8">
              {formatEmploymentType(offer?.employmentType)}
            </Text>
          </div>
        </div>
        <Tabs defaultValue="overview" mt="lg">
          <Tabs.List>
            <Tabs.Tab value="overview">Overview</Tabs.Tab>
            <Tabs.Tab value="application">Application</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="overview" pt="xl">
            <Overview offer={offer} />
          </Tabs.Panel>

          <Tabs.Panel value="application" py="xl" px="md">
            <AppLyForm />
          </Tabs.Panel>
        </Tabs>
      </div>
    </Container>
  )
}

export default JobPreview

const Overview = ({ offer }: { offer: Offer }) => {
  return (
    <>
      {offer?.whyUs && <Alert title="Why us">{offer?.whyUs}</Alert>}
      <div
        style={{
          marginTop: '1rem',
        }}
        dangerouslySetInnerHTML={{ __html: offer?.description }}
      />
    </>
  )
}
