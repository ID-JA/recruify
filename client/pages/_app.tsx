import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ReactElement, ReactNode } from 'react'

import '~/styles/global.css'

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const queryClient = new QueryClient()

export default function App(props: AppPropsWithLayout) {
  const { Component, pageProps } = props
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Fast Hire</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta
          name="description"
          content="fast recruiter platform helps you to share job offers and search for candidates"
        />
      </Head>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
