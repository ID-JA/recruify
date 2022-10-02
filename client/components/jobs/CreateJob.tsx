import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Group, Select, Text, Textarea, TextInput } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { ToolbarControl } from '@mantine/rte/lib/components/Toolbar/controls'

import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import AsyncCreatableSelect from 'react-select/async-creatable'
import * as yup from 'yup'

import { professionalSkillOptions } from '../../mock/data'
import RichTextEditor from '../RichTextEditor'
import useStyles from './CreateJob.styles'

const employmentTypes = [
  { value: 'full_time', label: 'Full Time' },
  { value: 'part_time', label: 'Part Time' },
  { value: 'contract', label: 'Contract' },
  { value: 'temporary', label: 'Temporary' },
  { value: 'internship', label: 'Internship' },
  { value: 'other', label: 'Other' },
]

const validationSchema = yup.object().shape({
  job_title: yup.string().required('Job title is required'),
  job_location: yup.string().required('Job location is required'),
  job_address_one: yup.string().required('Job address is required'),
  employment_type: yup.string().required('Employment type is required'),
  job_description: yup.string().required('Job description is required'),
  skills: yup.array().of(
    yup.object().shape({
      label: yup.string(),
      value: yup.string(),
    })
  ),
  why_work_here: yup.string().required('This field is required'),
  company_description: yup.string().required('company description is required'),
})

const defaultValues = {
  job_title: '',
  job_location: '',
  job_address_one: '',
  employment_type: '',
  job_description: '',
  skills: [],
  why_work_here: '',
  company_description: '',
}

const editorControls: ToolbarControl[][] = [
  ['bold', 'italic', 'underline', 'link', 'image'],
  ['unorderedList', 'h1', 'h2', 'h3'],
  ['sup', 'sub'],
  ['alignLeft', 'alignCenter', 'alignRight'],
]

const filterColors = (inputValue: string) => {
  return professionalSkillOptions.filter((i) =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  )
}

const promiseOptions = (inputValue: string) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve(filterColors(inputValue))
    }, 1000)
  })

function CreateJob() {
  const { classes, cx } = useStyles()
  const [openSelect, setOpenSelect] = useState(false)
  const [debounced] = useDebouncedValue(openSelect, 200)
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = (values: typeof defaultValues) => {
    console.log(values)
  }

  const handleSelectInputChange = (value: string) =>
    value.length > 1 ? setOpenSelect(true) : setOpenSelect(false)

  return (
    <div className={classes.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          className={classes.field}
          label="Job Title"
          error={errors.job_title && errors.job_title.message}
          {...register('job_title')}
        />
        <TextInput
          className={classes.field}
          label="Job Location"
          error={errors.job_location && errors.job_location.message}
          {...register('job_location')}
        />
        <TextInput
          className={classes.field}
          inputWrapperOrder={['label', 'description', 'input', 'error']}
          label="Job Address"
          description="Some job boards allow users to search with a map. Enter your street address for better visibility."
          error={errors.job_address_one && errors.job_address_one.message}
          {...register('job_address_one')}
        />

        <Controller
          render={({ field }) => (
            <Select
              className={classes.field}
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
          <Controller
            render={({ field }) => (
              <RichTextEditor
                mb={5}
                controls={editorControls}
                placeholder="Enter job description"
                {...register('job_description')}
                sticky
                className={cx({ [classes.invalid]: errors.job_description })}
                {...field}
              />
            )}
            control={control}
            name="job_description"
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
          <Controller
            render={({ field }) => (
              <AsyncCreatableSelect
                instanceId="creatable-select-skills"
                aria-label="select-skills"
                isMulti
                cacheOptions
                menuIsOpen={debounced}
                onInputChange={handleSelectInputChange}
                loadOptions={promiseOptions}
                {...register('skills')}
                {...field}
              />
            )}
            control={control}
            name="skills"
          />
        </div>

        <Textarea
          label="Why Work at This Company?"
          maxLength={140}
          className={classes.field}
          minRows={5}
          description="Give a one-line sales pitch for working at this company (140 characters max.). Note: editing this field will affect all jobs at this hiring company."
          error={errors.why_work_here && errors.why_work_here.message}
          {...register('why_work_here')}
        />
        <Textarea
          label="Hiring Company Description"
          maxLength={140}
          className={classes.field}
          minRows={5}
          description="Note: editing this description will affect all jobs at this hiring company."
          error={
            errors.company_description && errors.company_description.message
          }
          {...register('company_description')}
        />
        <Text mb="md" color="#667085" size="xs">
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

export { CreateJob }
