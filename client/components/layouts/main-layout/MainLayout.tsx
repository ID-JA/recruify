import { MantineProvider } from '@mantine/core'

import { MainLayoutInner } from './MainLayoutInner'

export interface AppLayoutProps {
  children: React.ReactNode
}

function MainLayout({ children }: AppLayoutProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <MainLayoutInner>{children}</MainLayoutInner>
    </MantineProvider>
  )
}

export { MainLayout }
