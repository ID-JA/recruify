import { Button, Container } from '@mantine/core'

import Logo from '../../logo/Logo'
import useStyles from './Header.styles'

function Header() {
  const { classes } = useStyles()

  return (
    <header className={classes.root}>
      <Container size="xl" className={classes.inner}>
        <div>
          <Logo height={30} width={135} />
        </div>
        <Button key="get-started-btn">Become recruiter</Button>
      </Container>
    </header>
  )
}

export default Header
