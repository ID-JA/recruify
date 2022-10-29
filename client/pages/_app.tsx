import { MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AppProps } from 'next/app'
import Head from 'next/head'

import { RootLayout } from '@/layouts/RootLayout/RootLayout'
import '@/styles/global.css'
import { NextPageWithLayout } from '@/types'

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

export default function App(props: AppPropsWithLayout) {
  const { Component, pageProps } = props
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>FastRecruiter</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
          <meta
            name="description"
            content="fast recruiter platform helps you to share job offers and search for candidates"
          />
        </Head>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <NotificationsProvider position="top-right">
            <RootLayout>{getLayout(<Component {...pageProps} />)}</RootLayout>
            <ReactQueryDevtools initialIsOpen={false} />
          </NotificationsProvider>
        </MantineProvider>
      </QueryClientProvider>
    </>
  )
}
