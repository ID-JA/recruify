import {MantineProvider} from '@mantine/core'
import {NextPage} from 'next'
import {AppProps} from 'next/app'
import Head from 'next/head'
import {ReactElement, ReactNode} from 'react'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App(props: AppPropsWithLayout) {
  const {Component, pageProps, router} = props
  const getLayout = Component.getLayout ?? (page => page)

  return getLayout(
    <>
      <Head>
        <title>Fast Hire</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Component {...pageProps} />
      </MantineProvider>
    </>,
  )
}