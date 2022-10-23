import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Group, Select, Text, Textarea, TextInput } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'

import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { InputActionMeta } from 'react-select'
import ReactSelectCreatable from 'react-select/creatable'
import * as yup from 'yup'

import { useSkills } from '~/hooks/use-skills'
import { EMPLOYMENT_TYPES } from '~/mock/data'

import RichTextEditor from '../RichTextEditor'
import useStyles from './CreateJob.styles'

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

function CreateJobForm() {
  const [searchedSkill, setSearchedSkill] = useState('')
  const { classes } = useStyles()

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  })
  const [debounced] = useDebouncedValue(searchedSkill, 500)

  const onSubmit = (values: typeof defaultValues) => {
    console.log(values)
  }

  const handleInputSkillsChange = (value: string, event: InputActionMeta) => {
    if (event.action !== 'input-blur' && event.action !== 'menu-close') {
      setSearchedSkill(value)
    }
  }
  const { data, status: searchStatus } = useSkills(debounced)

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
          label="Job Address"
          className={classes.field}
          inputWrapperOrder={['label', 'description', 'input', 'error']}
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
              data={EMPLOYMENT_TYPES}
              error={errors.employment_type && errors.employment_type.message}
              {...register('employment_type')}
              {...field}
            />
          )}
          control={control}
          name="employment_type"
        />
        <RichTextEditor
          label="Job Description"
          register={register}
          name="job_description"
          control={control}
          error={errors.job_description && errors.job_description.message}
        />

        <div className={classes.fieldWrapper}>
          <label className={classes.label}>Skills</label>
          <div className={classes.description}>
            Target the exact job seekers you need by adding skill keywords
            below.
          </div>

          <Controller
            render={({ field }) => (
              <ReactSelectCreatable
                instanceId="skills-autocomplete"
                isClearable
                isMulti
                isLoading={searchStatus === 'loading'}
                inputValue={searchedSkill}
                options={data}
                menuIsOpen={debounced.length >= 2}
                onInputChange={handleInputSkillsChange}
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

// eslint-disable-next-line import/no-anonymous-default-export
export default { Component: CreateJobForm, defaultValues, validationSchema }
