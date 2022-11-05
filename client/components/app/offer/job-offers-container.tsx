import { getJobOffers, JobOffersResponse } from '@/services/employer-services'
import { Text, Title } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'

import { NextRouter, useRouter } from 'next/router'
import { useMemo } from 'react'

import JobOfferCard from './job-offer-card'
import JobOfferPlaceholder from './job-offer-placeholder'
import OfferFilters from './offer-filters'

function JobOffersContainer() {
  const router = useRouter()

  const { data } = useQuery<JobOffersResponse>(
    ['jobs', getQueryString(router).split('sort=')[1] ? 'title' : 'createdAt'],
    () =>
      getJobOffers({
        sortBy: getQueryString(router).split('sort=')[1]
          ? 'title Asc'
          : 'createdAt Desc',
      }),
    {
      retry: false,
      staleTime: 10000,
    }
  )

  const loading = useMemo(() => {
    return data && data.data.length > 0 ? false : true
  }, [data])

  const jobs = useMemo(() => {
    return data?.data || []
  }, [data])

  return (
    <div>
      <OfferFilters />
      {loading ? (
        Array.from({ length: 5 }).map((_, i) => <JobOfferPlaceholder key={i} />)
      ) : jobs.length > 0 ? (
        jobs.map((props) => <JobOfferCard key={props.id} {...props} />)
      ) : (
        <>
          <Title align="center">You don&rsquo;t have any job offers yet</Title>
          <Text size="sm" align="center" color="gray.8">
            Create your first job offer now
          </Text>
        </>
      )}
    </div>
  )
}

export default JobOffersContainer

export const getQueryString = (router: NextRouter): string => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { slug: omit, ...queryWithoutSlug } = router.query as {
    slug: string
    [key: string]: string
  }
  const queryString = new URLSearchParams(queryWithoutSlug).toString()
  return `${queryString ? '?' : ''}${queryString}`
}
