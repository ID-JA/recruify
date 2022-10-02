import {
  Badge,
  Button,
  Container,
  createStyles,
  Divider,
  Group,
  Paper,
  Text,
  Title,
} from '@mantine/core'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { Briefcase, CurrencyDollar } from 'tabler-icons-react'

import { MainLayout } from '~/components'
import { NextPageWithLayout } from '../../../_app'

const useStyles = createStyles((theme) => ({
  wrapper: {},
  company_and_location: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '16px',
    lineHeight: 1.33,
    marginBottom: '15px',
    'a:link': {
      color: '#2f3639',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
  job_characteristics: {
    marginBottom: 20,
  },
  job_characteristics_item: {
    lineHeight: 1.6,
    marginBottom: '3px',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
  },
  job_more_section: {
    color: '#2f3639',
    paddingBottom: '30px',
    'a:link': {
      color: theme.colors.blue[7],
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
}))

const JobPost: NextPageWithLayout = () => {
  const { classes } = useStyles()
  const router = useRouter()

  const { companyId, jobId } = router.query

  const handleClick = () => {
    router.push(`/jobs/apply?company=${companyId}&job=${jobId}`)
  }

  return (
    <Container className={classes.wrapper}>
      <Paper p="xl" withBorder>
        <div className="job_header">
          <Title size="24px" mb="xs" weight={700}>
            Full Stack Developer
          </Title>
          <section className={classes.company_and_location}>
            <Link href="/c/google-labs-265652/jobs" passHref>
              <a>Google Labs</a>
            </Link>
            <Link href="/c/google-labs-265652/jobs" passHref>
              <a>Boston, MA, USA</a>
            </Link>
          </section>
        </div>
        <div className="job_content">
          <div className={classes.job_characteristics}>
            <Badge radius="sm" mb="lg">
              Remote
            </Badge>
            <div className={classes.job_characteristics_item}>
              <CurrencyDollar size="16px" />
              <Text weight={400} pl="xs">
                $90,000 to $110,000 Annually
              </Text>
            </div>
            <div className={classes.job_characteristics_item}>
              <Briefcase size="16px" />
              <Text weight={400} pl="xs">
                Full-Time
              </Text>
            </div>
          </div>
          <div className="job_description">
            <div>
              Nous recherchons un développeur front-end pour travailler en
              collaboration avec notre équipe de développeurs afin d&rsquo;aider
              à étendre les fonctionnalités et les fonctionnalités de notre
              solution SaaS.
              <br />
              <br /> En tant que responsable des partenariats pour
              l&rsquo;emploi, vous :
              <br />
              <ul>
                <li>
                  Collaborer avec l&rsquo;équipe pour concevoir, planifier et
                  exécuter les versions
                </li>
                <li>
                  Corrigez les bugs et re-testez pour garantir les résultats
                  souhaités
                </li>
                <li>
                  Créer du code et des bibliothèques réutilisables pour une
                  utilisation future
                </li>
                <li>
                  Maintenir les pipelines CI/CD et les tests automatisés (jest,
                  cypress ou similaire) pour les applications développées
                </li>
                <li>
                  Rédiger du code et aider à l&rsquo;architecture
                  d&rsquo;applications Web à grande échelle
                </li>
                <li>
                  Documenter les composants et les modèles de conception pour
                  permettre une consommation rapide des autres membres de
                  l&rsquo;équipe
                </li>
              </ul>
              Profil Recherché
              <br />
              <ul>
                <li>
                  3 à 5 ans d&rsquo;expérience de travail dans React React
                  Native
                </li>
                <li>
                  Expérience avec la consommation d&rsquo;API basées sur REST.
                </li>
                <li>
                  Possibilité de créer une interface utilisateur au pixel près
                  en utilisant des maquettes d&rsquo;écran comme référence.
                </li>
                <li>
                  Expérience en rédaction de tests automatisés et en suivant les
                  normes de codage.
                </li>
                <li>
                  Excellente compétence en analyse et résolution de problèmes
                </li>
                <li>
                  Capacité à prioriser, à effectuer plusieurs tâches et à gérer
                  le temps efficacement
                </li>
                <li>
                  Esprit d&rsquo;équipe avec la capacité de travailler de
                  manière autonome
                </li>
                <li>Très motivé et axé sur la cible </li>
              </ul>
              Compétences
              <br />
              <br /> Avantages sociaux et autres
              <br />
              <br /> Amplitude horaire
            </div>
          </div>
        </div>
        <Divider my="lg" />
        <div className={classes.job_more_section}>
          <Text>Posted date: yesterday</Text>
          <Link href="/c/google-labs-56565626/jobs/" passHref>
            <a>View all Jobs at Google Labs</a>
          </Link>
        </div>
        <Group position="center" mt="md">
          <Button size="md" onClick={handleClick}>
            Apply Now
          </Button>
        </Group>
      </Paper>
    </Container>
  )
}

export default JobPost

JobPost.getLayout = (page) => <MainLayout>{page}</MainLayout>
