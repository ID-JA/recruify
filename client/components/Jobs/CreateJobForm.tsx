import {
  Button,
  createStyles,
  Group,
  Select,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core'
import {useDebouncedValue} from '@mantine/hooks'
import {useEffect, useState} from 'react'
import RichTextEditor from '../RichTextEditor'

const useStyles = createStyles(() => ({
  wrapper: {
    width: '100%',
    maxWidth: '850px',
    marginTop: '5px',
  },
  editorWrapper: {
    marginBottom: '20px',
  },
  textEditorLabel: {
    display: 'inline-block',
    fontSize: '14px',
    fontWeight: 500,
    color: '#212529',
    wordBreak: 'break-word',
    cursor: 'default',
    WebkitTapHighlightColor: 'transparent',
    marginBottom: '10px',
  },
}))

const employmentTypes = [
  {value: 'full_time', label: 'Full Time'},
  {value: 'part_time', label: 'Part Time'},
  {value: 'contract', label: 'Contract'},
  {value: 'temporary', label: 'Temporary'},
  {value: 'internship', label: 'Internship'},
  {value: 'other', label: 'Other'},
]

var myHeaders = new Headers()
myHeaders.append('apikey', 'R4At1uZ6M6JgqFsQqALK4B8BTk5hdE49')

const requestOptions = {
  method: 'GET',
  // redirect: 'follow',
  headers: myHeaders,
}

const fetchSkills = async (skill?: string) => {
  const response = await fetch(
    `https://api.apilayer.com/skills?q=${skill}&count=5`,
    requestOptions,
  )
  return response.json()
}

function CreateJobForm() {
  const {classes} = useStyles()
  const [skill, setSkill] = useState<string>('')
  const [skills, setSkills] = useState<string[]>([])
  const [debounced] = useDebouncedValue(skill, 200)

  const handleChange = (value: string) => {
    setSkill(value)
    console.log('setting value...')
  }
  useEffect(() => {
    if (debounced) {
      console.log('fetching autocomplete...')
      // fetchSkills(debounced)
      //   .then(response => setSkills([...response]))
      //   .catch(error => console.error(error))
    }
  }, [debounced])

  return (
    <div className={classes.wrapper}>
      <TextInput
        mb="lg"
        label="Job Title"
        styles={{
          label: {
            marginBottom: '10px',
          },
        }}
      />
      <TextInput
        mb="lg"
        label="Job Location"
        styles={{
          label: {
            marginBottom: '10px',
          },
        }}
      />
      <TextInput
        mb="lg"
        inputWrapperOrder={['label', 'description', 'input', 'error']}
        label="Job Address"
        description="Some job boards allow users to search with a map. Enter your street address for better visibility."
        styles={{
          description: {
            marginBottom: '10px',
          },
        }}
      />
      <Select
        mb="lg"
        styles={{
          label: {
            marginBottom: '10px',
          },
        }}
        label="Employment Type"
        placeholder="Select one"
        data={employmentTypes}
      />
      <div className={classes.editorWrapper}>
        <label className={classes.textEditorLabel}>Job Description</label>
        <RichTextEditor
          controls={[
            ['bold', 'italic', 'underline', 'link', 'image'],
            ['unorderedList', 'h1', 'h2', 'h3'],
            ['sup', 'sub'],
            ['alignLeft', 'alignCenter', 'alignRight'],
          ]}
          placeholder="Enter job description"
          sticky
        />
      </div>

      {/* TODO: CREATE MY OWN AUTOCOMPLETE COMPONENT */}
      {/* {skills.length > 0 &&
        skills.map((item, index) => <Badge key={`key-${index}`}>{item}</Badge>)}

      <Autocomplete
        multiple
        onKeyUp={e =>
          e.keyCode === 13 && setSkills([...skills, e.target.value])
        }
        label="Skills"
        description="Target the exact job seekers you need by adding skill keywords below. "
        value={skill}
        onChange={value => handleChange(value)}
        data={['React', 'Angular', 'Svelte', 'Vue']}
        styles={{
          description: {
            marginBottom: '10px',
          },
        }}
        itemComponent={AutoCompleteItem}
      /> */}
      <Textarea
        label="Why Work at This Company?"
        styles={{
          description: {
            marginBottom: '10px',
          },
        }}
        maxLength={140}
        mb="lg"
        minRows={5}
        description="Give a one-line sales pitch for working at this company (140 characters max.). Note: editing this field will affect all jobs at this hiring company."
      />
      <Textarea
        label="Hiring Company Description"
        styles={{
          description: {
            marginBottom: '10px',
          },
        }}
        maxLength={140}
        mb="lg"
        minRows={5}
        description="Note: editing this description will affect all jobs at this hiring company."
      />
      <Text mb="md" color="dimmed" size="xs">
        By clicking Save & Post Now, I agree that ZipRecruiter may publish
        and/or distribute my job advertisement on its site and through its
        distribution partners.
      </Text>
      <Group position="left">
        <Button>Save & Post Now</Button>
        <Button variant="subtle">Save Draft</Button>
      </Group>
    </div>
  )
}

export default CreateJobForm
