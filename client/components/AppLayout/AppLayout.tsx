import { MantineProvider } from '@mantine/core'
import React from 'react'
import AppLayoutInner from './AppLayoutInner'

export interface AppLayoutProps {
  children: React.ReactNode
}

function AppLayout({ children }: AppLayoutProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        components: {
          TextInput: {
            styles: {
              description: {
                color: '#667085',
                marginBottom: '10px',
              },
            },
          },
        },
      }}
    >
      <AppLayoutInner>{children}</AppLayoutInner>
    </MantineProvider>
  )
}

export default AppLayout
