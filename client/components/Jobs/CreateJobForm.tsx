import { yupResolver } from '@hookform/resolvers/yup'
import {
  Autocomplete,
  AutocompleteProps,
  Button,
  createStyles,
  Group,
  Select,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core'
import AsyncCreatableSelect from 'react-select/async-creatable'

import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import {
  ProfessionalSkillOption,
  professionalSkillOptions,
} from '../../mock/professional-skills'
// import CustomCreatableSelect from '../CreatableSelect/CreatableSelect'
import { useDebouncedValue } from '@mantine/hooks'
import RichTextEditor from '../RichTextEditor'

const useStyles = createStyles(() => ({
  wrapper: {
    width: '100%',
    maxWidth: '850px',
    marginTop: '5px',
  },
  fieldWrapper: {
    marginBottom: '20px',
  },
  label: {
    display: 'inline-block',
    fontSize: '14px',
    fontWeight: 500,
    color: '#212529',
    wordBreak: 'break-word',
    cursor: 'default',
    WebkitTapHighlightColor: 'transparent',
  },
  description: {
    color: '#868e96',
    fontSize: '12px',
    lineHeight: '1.55',
    textDecoration: 'none',
    wordBreak: 'break-word',
    display: 'block',
    marginBottom: '10px',
  },
  invalidMessage: {
    textDecoration: 'none',
    wordBreak: 'break-word',
    color: '#fa5252',
    fontSize: '12px',
    lineHeight: '1.2',
    display: 'block',
  },
  invalid: {
    borderColor: '#fa5252',
  },
}))

const employmentTypes = [
  { value: 'full_time', label: 'Full Time' },
  { value: 'part_time', label: 'Part Time' },
  { value: 'contract', label: 'Contract' },
  { value: 'temporary', label: 'Temporary' },
  { value: 'internship', label: 'Internship' },
  { value: 'other', label: 'Other' },
]

const validationSchema = yup.object().shape({
  job_title: yup.string().required(),
  job_location: yup.string().required(),
  job_address_one: yup.string().required(),
  employment_type: yup.string().required(),
  job_description: yup.string().required(),
  skills: yup.string(),
  why_work_here: yup.string().required(),
  company_description: yup.string().required(),
})

const defaultValues = {
  job_title: '',
  job_location: '',
  job_address_one: '',
  employment_type: '',
  job_description: '',
  skills: '',
  why_work_here: '',
  company_description: '',
}

const filterSkills = (inputValue: string) => {
  return professionalSkillOptions
    .filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()))
    .slice(0, 10)
}

const promiseOptions = (inputValue: string) =>
  new Promise<ProfessionalSkillOption[]>((resolve) => {
    setTimeout(() => {
      resolve(filterSkills(inputValue))
    }, 1000)
  })

function CreateJobForm() {
  const { classes, cx } = useStyles()
  const [openSelect, setOpenSelect] = useState(false)
  const [debounced] = useDebouncedValue(openSelect, 200)
  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = (values: typeof defaultValues) => {
    console.log(values)
  }

  return (
    <div className={classes.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          mb="lg"
          label="Job Title"
          styles={{
            label: {
              marginBottom: '10px',
            },
          }}
          error={errors.job_title && errors.job_title.message}
          {...register('job_title')}
        />
        <TextInput
          mb="lg"
          label="Job Location"
          styles={{
            label: {
              marginBottom: '10px',
            },
          }}
          error={errors.job_location && errors.job_location.message}
          {...register('job_location')}
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
          error={errors.job_address_one && errors.job_address_one.message}
          {...register('job_address_one')}
        />

        <Controller
          render={({ field }) => (
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
              error={errors.employment_type && errors.employment_type.message}
              {...register('employment_type')}
              {...field}
            />
          )}
          control={control}
          name="employment_type"
        />

        <div className={classes.fieldWrapper}>
          <label className={classes.label}>Job Description</label>
          <RichTextEditor
            mb={5}
            controls={[
              ['bold', 'italic', 'underline', 'link', 'image'],
              ['unorderedList', 'h1', 'h2', 'h3'],
              ['sup', 'sub'],
              ['alignLeft', 'alignCenter', 'alignRight'],
            ]}
            placeholder="Enter job description"
            sticky
            className={cx({ [classes.invalid]: errors.job_description })}
            onChange={(value) => setValue('job_description', value)}
          />
          {errors.job_description && (
            <span
              className={classes.invalidMessage}
              key="job-description-error"
            >
              {errors.job_description.message}
            </span>
          )}
        </div>
        <div className={classes.fieldWrapper}>
          <label className={classes.label}>Skills</label>
          <div className={classes.description}>
            Target the exact job seekers you need by adding skill keywords
            below.
          </div>
          <AsyncCreatableSelect
            isMulti
            menuIsOpen={debounced}
            onInputChange={(value) =>
              value.length > 1 ? setOpenSelect(true) : setOpenSelect(false)
            }
            cacheOptions
            defaultOptions
            loadOptions={promiseOptions}
            id="creatable-select"
          />
        </div>

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
          error={errors.why_work_here && errors.why_work_here.message}
          {...register('why_work_here')}
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
          error={
            errors.company_description && errors.company_description.message
          }
          {...register('company_description')}
        />
        <Text mb="md" color="dimmed" size="xs">
          By clicking Save & Post Now, I agree that ZipRecruiter may publish
          and/or distribute my job advertisement on its site and through its
          distribution partners.
        </Text>
        <Group position="left">
          <Button type="submit">Save & Post Now</Button>
          <Button variant="subtle">Save Draft</Button>
        </Group>
      </form>
    </div>
  )
}

const CustomAutoComplete = React.forwardRef<
  HTMLInputElement,
  AutocompleteProps
>((props: AutocompleteProps, ref) => {
  return <Autocomplete ref={ref} {...props} />
})

CustomAutoComplete.displayName = 'CustomAutoComplete'
export default CreateJobForm
