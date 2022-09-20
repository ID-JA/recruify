import { MantineProvider } from '@mantine/core'
import React from 'react'
import AppLayoutInner from './AppLayoutInner'

export interface AppLayoutProps {
  children: React.ReactNode
}

function AppLayout({ children }: AppLayoutProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AppLayoutInner>{children}</AppLayoutInner>
    </MantineProvider>
  )
}

export default AppLayout
