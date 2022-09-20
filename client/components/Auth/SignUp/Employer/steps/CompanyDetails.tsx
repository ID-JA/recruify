import { Text, TextInput } from '@mantine/core'
import { useFormContext } from 'react-hook-form'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  org_name: yup.string().required('Company Name is required'),
  location: yup.string().required(),
  org_website: yup.string().notRequired(),
})

interface ICompanyDetails {
  org_name: string
  location: string
  org_website: string
}

const defaultValues = {
  org_name: '',
  location: '',
  org_website: '',
}

function CompanyDetails() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ICompanyDetails>()

  return (
    <>
      <Text size="xl" weight="bold" align="center" mb="24px">
        Tell Us About Your Company
      </Text>
      <TextInput
        label="Company Name"
        type="text"
        mb="20px"
        {...register('org_name')}
        error={errors.org_name && errors.org_name.message}
      />
      <TextInput
        label="Location"
        type="text"
        mb="20px"
        {...register('location')}
        error={errors.location && errors.location.message}
      />

      <TextInput
        label="Company website"
        type="text"
        mb="20px"
        placeholder="Optional"
        {...register('org_website')}
      />
    </>
  )
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  Component: CompanyDetails,
  validationSchema,
  defaultValues,
  key: 'company-details',
}
