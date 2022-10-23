import { Text, TextInput } from '@mantine/core'
import { useFormContext } from 'react-hook-form'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  companyName: yup.string().required('this field is required'),
  companyLocation: yup.string().required('this field is required'),
  companyWebsite: yup.string().notRequired(),
})

interface ICompanyDetails {
  companyName: string
  companyLocation: string
  companyWebsite: string
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
        {...register('companyName')}
        error={errors.companyName && errors.companyName.message}
      />
      <TextInput
        label="Location"
        type="text"
        mb="20px"
        {...register('companyLocation')}
        error={errors.companyLocation && errors.companyLocation.message}
      />

      <TextInput
        label="Company website"
        type="text"
        mb="20px"
        placeholder="Optional"
        {...register('companyWebsite')}
      />
    </>
  )
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  Component: CompanyDetails,
  validationSchema,
  key: 'company-details',
}
