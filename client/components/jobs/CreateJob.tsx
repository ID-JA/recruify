import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Group, Select, Text, Textarea, TextInput } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { InputActionMeta } from 'react-select'
import ReactSelectCreatable from 'react-select/creatable'
import * as yup from 'yup'

import { useSkills } from '@/hooks/use-skills'
import { EMPLOYMENT_TYPES } from '@/mock/data'
import { createNewJob } from '@/services/employer-services'

import RichTextEditor from '../RichTextEditor'
import useStyles from './CreateJob.styles'

const validationSchema = yup.object().shape({
  title: yup.string().required('Job title is required'),
  location: yup.string().required('Job location is required'),
  address: yup.string().required('Job address is required'),
  employmentType: yup.string().required('Employment type is required'),
  description: yup.string().required('Job description is required'),
  skills: yup.array().of(
    yup.object().shape({
      label: yup.string(),
      value: yup.string(),
    })
  ),
  whyUs: yup.string().required('This field is required'),
  companyDescription: yup.string().required('company description is required'),
})

const defaultValues = {
  title: '',
  location: '',
  address: '',
  employmentType: '',
  description: '',
  skills: [],
  whyUs: '',
  companyDescription: '',
}

export function CreateJobForm() {
  const [searchedSkill, setSearchedSkill] = useState('')
  const { classes } = useStyles()
  const queryClient = useQueryClient()
  const router = useRouter()
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
  const { data, status: searchStatus } = useSkills(debounced)

  const mutation = useMutation(createNewJob, {
    onSuccess: () => {
      queryClient.invalidateQueries(['jobs'])
      router.push('/my-jobs')
      showNotification({
        title: 'Job created successfully',
        message: 'Your job has been created successfully',
        color: 'green',
      })
    },
    onError: () => {
      showNotification({
        title: 'Error',
        message: 'Error occurred while creating job',
        color: 'red',
      })
    },
  })

  const handleSubmitPublish = (values: typeof defaultValues) => {
    mutation.mutate({
      ...values,
      savaAsDraft: 1,
      skills: JSON.stringify(values.skills),
    })
  }

  const handleSubmitDraft = (values: typeof defaultValues) => {
    mutation.mutate({
      ...values,
      savaAsDraft: 0,
      skills: JSON.stringify(values.skills),
    })
  }

  const handleInputSkillsChange = (value: string, event: InputActionMeta) => {
    if (event.action !== 'input-blur' && event.action !== 'menu-close') {
      setSearchedSkill(value)
    }
  }

  return (
    <div className={classes.wrapper}>
      <form>
        <TextInput
          className={classes.field}
          label="Job Title"
          error={errors.title && errors.title.message}
          {...register('title')}
        />
        <TextInput
          className={classes.field}
          label="Job Location"
          error={errors.location && errors.location.message}
          {...register('location')}
        />
        <TextInput
          label="Job Address"
          className={classes.field}
          inputWrapperOrder={['label', 'description', 'input', 'error']}
          description="Some job boards allow users to search with a map. Enter your street address for better visibility."
          error={errors.address && errors.address.message}
          {...register('address')}
        />

        <Controller
          render={({ field }) => (
            <Select
              className={classes.field}
              label="Employment Type"
              placeholder="Select one"
              data={EMPLOYMENT_TYPES}
              error={errors.employmentType && errors.employmentType.message}
              {...register('employmentType')}
              {...field}
            />
          )}
          control={control}
          name="employmentType"
        />
        <RichTextEditor
          label="Job Description"
          register={register}
          name="description"
          control={control}
          error={errors.description && errors.description.message}
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
          error={errors.whyUs && errors.whyUs.message}
          {...register('whyUs')}
        />
        <Textarea
          label="Hiring Company Description"
          maxLength={140}
          className={classes.field}
          minRows={5}
          description="Note: editing this description will affect all jobs at this hiring company."
          error={errors.companyDescription && errors.companyDescription.message}
          {...register('companyDescription')}
        />
        <Text mb="md" color="#667085" size="xs">
          By clicking Save & Post Now, I agree that ZipRecruiter may publish
          and/or distribute my job advertisement on its site and through its
          distribution partners.
        </Text>
        <Group position="left">
          <Button
            type="submit"
            onClick={handleSubmit(handleSubmitPublish)}
            loading={mutation.isLoading}
            name="publish"
          >
            Save & Post Now
          </Button>
          <Button
            type="submit"
            variant="subtle"
            onClick={handleSubmit(handleSubmitDraft)}
            loading={mutation.isLoading}
            name="draft"
          >
            Save Draft
          </Button>
        </Group>
      </form>
    </div>
  )
}
