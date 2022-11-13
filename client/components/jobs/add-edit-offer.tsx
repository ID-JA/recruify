import { useSkills } from '@/hooks/use-skills'
import { EMPLOYMENT_TYPES } from '@/mock/data'
import { createNewJob, updateJobOffer } from '@/services/employer-services'

import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Group, Select, Textarea, TextInput } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useRouter } from 'next/router'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { InputActionMeta } from 'react-select'
import * as yup from 'yup'

import ReactSelectCreatable from 'react-select/creatable'
import RichTextEditor from '../shared/RichTextEditor'
import useStyles from './CreateJob.styles'

// TODO: Check if form on Edit mode or create mode

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

type OfferProps = {
  id: string
  title: string
  location: string
  address: string
  employmentType: string
  description: string
  skills: []
  whyUs: string
  companyDescription: string
  status: number
}

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

function AddEditOffer({ offer }: { offer?: OfferProps }) {
  const [searchedSkill, setSearchedSkill] = useState('') // useRef
  const { classes } = useStyles()
  const queryClient = useQueryClient()
  const router = useRouter()

  const [debounced] = useDebouncedValue(searchedSkill, 500)
  const { data, isFetching } = useSkills(debounced)

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: offer || defaultValues,
    resolver: yupResolver(validationSchema),
  })

  const mutation = useMutation(offer?.id ? updateJobOffer : createNewJob, {
    onSuccess: () => {
      queryClient.invalidateQueries(['jobs'])
      showNotification({
        title: offer?.id ? 'Job offer updated' : 'Job offer created',
        message: offer?.id
          ? 'Job offer updated successfully'
          : 'Job offer created successfully',
        color: 'green',
      })
      router.push('/my-jobs')
    },
    onError: () => {
      showNotification({
        title: 'Error',
        message: offer?.id
          ? 'Job offer update failed'
          : 'Job offer creation failed',
        color: 'red',
      })
    },
  })

  const handleInputSkillsChange = (value: string, event: InputActionMeta) => {
    if (event.action !== 'input-blur' && event.action !== 'menu-close') {
      setSearchedSkill(value)
    }
  }
  // * Create Job Offer and publish it (status = 1)
  const handleSubmitPublish = (values: typeof defaultValues) => {
    mutation.mutate({
      ...values,
      savaAsDraft: 1,
      skills: JSON.stringify(values.skills),
    })
  }

  // * Create Job Offer and save it as draft (status = 0)
  const handleSubmitDraft = (values: typeof defaultValues) => {
    mutation.mutate({
      ...(offer?.id && { id: offer?.id }),
      ...values,
      savaAsDraft: offer?.status || 0,
      skills: JSON.stringify(values.skills),
    })
  }

  // * Update Job Offer and publish it (status = 1)
  const handleSubmitUpdate = (values: typeof defaultValues) => {
    mutation.mutate({
      ...(offer?.id && { id: offer?.id }),
      ...values,
      savaAsDraft: 1,
      skills: JSON.stringify(values.skills),
    })
  }

  return (
    <form className={classes.wrapper}>
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
          Target the exact job seekers you need by adding skill keywords below.
        </div>

        <Controller
          render={({ field }) => (
            <ReactSelectCreatable
              instanceId="skills-autocomplete"
              isClearable
              isMulti
              isLoading={isFetching}
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

      <Group position="left">
        {offer?.id && offer?.status === 0 ? (
          <Button
            type="submit"
            onClick={handleSubmit(handleSubmitUpdate)}
            loading={mutation.isLoading}
            name="publish-now"
          >
            {' '}
            Publish Now{' '}
          </Button>
        ) : (
          !offer?.id && (
            <Button
              type="submit"
              onClick={handleSubmit(handleSubmitPublish)}
              loading={mutation.isLoading}
              name="publish"
            >
              Save & Post Now
            </Button>
          )
        )}

        <Button
          type="submit"
          variant="subtle"
          onClick={handleSubmit(handleSubmitDraft)}
          loading={mutation.isLoading}
          name="draft"
        >
          {offer?.id ? 'Save Changes' : 'Save as Draft'}
        </Button>
      </Group>
    </form>
  )
}

export default AddEditOffer
