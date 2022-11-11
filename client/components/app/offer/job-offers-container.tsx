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
    [
      'jobs',
      {
        sort: getQueryPrams(router)['sort'] || 'createdAt Desc',
        status: getQueryPrams(router)['status'] || 'active',
      },
    ],
    () =>
      getJobOffers({
        sortBy: getQueryPrams(router)['sort']
          ? 'nbrCandidates Desc'
          : 'createdAt Desc',
        status: getQueryPrams(router)['status']?.split(','),
      }),
    {
      retry: false,
      staleTime: 30000,
    }
  )

  const loading = useMemo(() => {
    return data && data.data.length >= 0 ? false : true
  }, [data])

  const jobs = useMemo(() => {
    return data?.data || []
  }, [data])

  return (
    <div>
      <OfferFilters />
      {loading ? (
        Array.from({ length: 4 }).map((_, i) => <JobOfferPlaceholder key={i} />)
      ) : jobs.length > 0 ? (
        jobs.map((job) => <JobOfferCard key={job.id} {...job} />)
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

export const getQueryPrams = (router: NextRouter) => {
  const queryPrams = new URLSearchParams(
    router.query as {
      [key: string]: string
    }
  )
  return Object.fromEntries(queryPrams.entries())
}

export const getQueryString = (router: NextRouter): string => {
  const { ...queryWithoutSlug } = router.query as {
    slug: string
    [key: string]: string
  }
  const queryString = new URLSearchParams(queryWithoutSlug).toString()
  return `${queryString ? '?' : ''}${queryString}`
}
