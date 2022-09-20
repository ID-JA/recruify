import { Center, Container } from '@mantine/core'
import { Logo } from '../Logo/Logo'

type AuthLayoutProps = {
  children: React.ReactNode
}

export function AuthLayout(props: AuthLayoutProps) {
  const { children } = props
  return (
    <Container mt="40px">
      <Center mb="24px">
        <Logo />
      </Center>
      {children}
    </Container>
  )
}
