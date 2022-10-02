import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'

import { MainLayoutInner } from './MainLayoutInner'

export interface AppLayoutProps {
  children: React.ReactNode
}

function MainLayout({ children }: AppLayoutProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <ModalsProvider>
        <MainLayoutInner>{children}</MainLayoutInner>
      </ModalsProvider>
    </MantineProvider>
  )
}

export { MainLayout }
