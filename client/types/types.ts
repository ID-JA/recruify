import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type JobOfferProps = {
  id: string
  title: string
  location: string
  companyName: string
  createdAt: Date
  candidatesCount: number
  status: number
}
