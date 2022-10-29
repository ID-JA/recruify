import {
  Button,
  Container,
  createStyles,
  SimpleGrid,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import { BrandGithub } from 'tabler-icons-react'
import data from './data'

const useStyles = createStyles((theme) => ({
  inner: {
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      display: 'flex',
      alignItems: 'center',
      gap: '2rem',
    },
  },
  content: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  title: {
    fontSize: 'clamp(2.3rem, 5vw, 3.2rem)',
    textAlign: 'center',
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      textAlign: 'left',
    },
  },
  highlight: {
    color: theme.colors.blue[6],
    fontWeight: 600,
  },
  subtitle: {
    fontSize: '18px',
    lineHeight: 1.2,
    textAlign: 'center',
    color: '#495057',
    marginTop: '16px',

    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      textAlign: 'left',
    },
  },
  imageContainer: {
    display: 'none',
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      display: 'block',
    },
  },

  controls: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginTop: '2rem',
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      justifyContent: 'flex-start',
    },
  },
  featureIcon: {
    backgroundColor: theme.colors.gray[0],
    color: theme.colors.blue[6],
  },
  featureTitle: {
    fontSize: theme.fontSizes.md,
    fontWeight: 500,
    marginBottom: '7px',
    lineHeight: '1',
  },
  featureBody: {
    marginTop: 16,
  },
  featureDescription: {
    fontSize: theme.fontSizes.xs,
    lineHeight: '20px',
    color: theme.colors.gray[7],
  },
}))

export function Home() {
  const { classes } = useStyles()

  const features = data.map((feature) => (
    <div key={feature.title}>
      <ThemeIcon size={44} className={classes.featureIcon}>
        <feature.icon size={24} strokeWidth={1.5} />
      </ThemeIcon>
      <div className={classes.featureBody}>
        <Text className={classes.featureTitle}>{feature.title}</Text>
        <Text className={classes.featureDescription}>
          {feature.description}
        </Text>
      </div>
    </div>
  ))
  return (
    <>
      <Container size="xl" pt="80px" px="md">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title} order={1}>
              Create, Post, and Manage your job offers
            </Title>
            <Text className={classes.subtitle}>
              <span className={classes.highlight}>FastRecruiter</span> is the
              fastest and most effective way to hire and attract top talent
            </Text>
            <div className={classes.controls}>
              <Link href="/signin" passHref>
                <Button component="a" variant="filled" color="blue" radius="md">
                  Get Started
                </Button>
              </Link>
              <Link
                href="https://www.github.com/ID-JA/fast-recruiter"
                target="_blank"
                passHref
              >
                <Button
                  leftIcon={<BrandGithub />}
                  variant="light"
                  color="blue"
                  radius="md"
                  component="a"
                  target="_blank"
                >
                  Code source
                </Button>
              </Link>
            </div>
            {/* Features section */}

            <SimpleGrid
              cols={3}
              breakpoints={[{ maxWidth: 600, cols: 1, spacing: 'sm' }]}
              style={{
                marginTop: '2rem',
              }}
            >
              {features}
            </SimpleGrid>
          </div>
          <div className={classes.imageContainer}>
            <Image
              alt="hero"
              src="/hero-illustration.webp"
              height={800}
              width={1200}
            />
          </div>
        </div>
      </Container>
    </>
  )
}
