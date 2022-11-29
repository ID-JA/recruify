import { Offer } from '@/hooks/use-offer'
import { Alert, createStyles, Tabs, Text, Title } from '@mantine/core'
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
const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    '@media (min-width: 768px)': {
      display: 'grid',
      gridTemplateColumns: '.4fr 1fr',
    },
  },
  left: {
    marginTop: 16,
    padding: 16,
    boxShadow: '0 0 0 1px #e1e1e1',
    '@media (min-width: 768px)': {
      marginTop: 60,
      paddingTop: 24,
      paddingBottom: 24,
      boxShadow: 'none',
    },
  },
  right: {
    marginTop: 30,
    '@media (min-width: 768px)': {},
  },
  navigation: {
    boxShadow: '0 0 0 1px #e1e1e1',
    '@media (min-width: 768px)': {
      boxShadow: 'none',
    },
  },
}))

function JobPreview({ offer }: { offer: Offer }) {
  const { classes } = useStyles()
  return (
    <>
      <Title order={2}>{offer?.title}</Title>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <div
            style={{
              paddingBottom: '16px',
              borderBottom: '1px solid #e1e1e1',
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
              borderBottom: '1px solid #e1e1e1',
            }}
          >
            <Title order={2} size={12} color="gray" mb={6}>
              Location
            </Title>
            <Text color="gray.8">{offer?.address}</Text>
          </div>
          <div
            style={{
              paddingTop: '16px',
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
        <Tabs
          defaultValue="overview"
          mt="lg"
          className={classes.right}
          classNames={{
            tabsList: classes.navigation,
          }}
        >
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
    </>
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
