import JobPreview from '@/components/jobs/job-preview'
import { useJobOffer } from '@/hooks/use-offer'
import { Container, createStyles } from '@mantine/core'
import Head from 'next/head'

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },
  company_and_location: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '16px',
    lineHeight: 1.33,
    marginBottom: '15px',
    'a:link': {
      color: '#2f3639',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
  job_characteristics: {
    marginBottom: 20,
  },
  job_characteristics_item: {
    lineHeight: 1.6,
    marginBottom: '3px',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
  },
  job_more_section: {
    color: '#2f3639',
    paddingBottom: '30px',
    'a:link': {
      color: theme.colors.blue[7],
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
}))

function JobOffer() {
  const { classes } = useStyles()
  const { jobId } = useJobOffer()

  return (
    <>
      <Head>
        <title>Google is hiring</title>
        <meta
          property="og:image"
          content="https://my-og-img.vercel.app/api/og?company=X-Hub"
        />
      </Head>
      <Container className={classes.wrapper}>
        <JobPreview id={jobId} />
      </Container>
    </>
  )
}

export default JobOffer
