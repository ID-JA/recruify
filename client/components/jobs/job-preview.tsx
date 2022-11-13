import { Offer } from '@/hooks/use-offer'
import { Alert, Button, Paper, Text, Title } from '@mantine/core'
import { Briefcase } from 'tabler-icons-react'

function JobPreview({ offer }: { offer: Offer }) {
  return (
    <Paper
      withBorder
      p="xl"
      sx={{
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          marginBottom: '1rem',
        }}
      >
        <Title order={2} mb="xs">
          {offer?.title}
        </Title>
        <Text>{offer?.companyName}</Text>
        <Text>{offer?.address}</Text>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1rem',
        }}
      >
        <Briefcase size={20} color="#2f3639" />
        <span>{offer?.employmentType}</span>
      </div>
      {offer?.whyUs && <Alert title="Why us">{offer?.whyUs}</Alert>}
      <div
        style={{
          marginTop: '1rem',
        }}
        dangerouslySetInnerHTML={{ __html: offer?.description }}
      />
      <div
        style={{
          marginTop: '1rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button>Apply Now</Button>
      </div>
    </Paper>
  )
}

export default JobPreview
