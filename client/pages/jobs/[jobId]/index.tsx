import JobPreview from '@/components/jobs/job-preview'
import JobPreviewPlaceholder from '@/components/jobs/job-preview-plcaeholder'
import { useOffer } from '@/hooks/use-offer'
import { Container, createStyles, ScrollArea } from '@mantine/core'
import Head from 'next/head'
import { useMemo } from 'react'

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
  const { data, error } = useOffer()

  const loading = useMemo(() => {
    return !data && !error
  }, [data, error])

  return (
    <>
      <Head>
        <title>
          {data ? `${data.title} @ ${data.companyName}` : 'Loading...'}
        </title>
        <meta
          property="og:image"
          content={`https://fast-recruiter.vercel.app/api/og?company=XCompany`}
        />
      </Head>
      <ScrollArea style={{ height: 700 }}>
        <Container className={classes.wrapper}>
          {loading ? (
            <JobPreviewPlaceholder />
          ) : !data ? (
            <div>
              <h1>Job not found</h1>
            </div>
          ) : (
            <JobPreview offer={data} />
          )}
        </Container>
      </ScrollArea>
    </>
  )
}

export default JobOffer
