import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'

import AppLayoutInner from './AppLayoutInner'

export interface AppLayoutProps {
  children: React.ReactNode
}

function AppLayout({ children }: AppLayoutProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <ModalsProvider>
        <AppLayoutInner>{children}</AppLayoutInner>
      </ModalsProvider>
    </MantineProvider>
  )
}

export default AppLayout
