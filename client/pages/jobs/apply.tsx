import {
  Checkbox,
  Container,
  Paper,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core'
import { useRouter } from 'next/router'

function Apply() {
  const router = useRouter()
  console.log(router.query)

  return (
    <Container>
      <Paper withBorder p="xl">
        <Title> Apply for job</Title>

        <TextInput label="Full Name" />
        <TextInput label="Phone Number" />
        <div>Step 2 :Work Experience</div>
        <TextInput label="Job Title" />
        <TextInput label="Company Name" />
        <Checkbox label="I currently work here" />
        <div>Start Year</div>
        <div>End Year Year</div>
        <Textarea label="Description" />
      </Paper>
    </Container>
  )
}

export default Apply
