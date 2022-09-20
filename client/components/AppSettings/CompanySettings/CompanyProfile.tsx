import { Button, Divider, Group, TextInput } from '@mantine/core'
import { BrandFacebook, BrandLinkedin, BrandTwitter } from 'tabler-icons-react'
import SettingsContainer from '../SettingsContainer'

const CompanySocials = () => {
  return (
    <SettingsContainer title="Social profiles">
      <TextInput
        styles={{
          label: {
            marginBottom: '10px',
          },
        }}
        mb="lg"
        icon={<BrandFacebook strokeWidth={1.5} />}
      />
      <TextInput
        styles={{
          label: {
            marginBottom: '10px',
          },
        }}
        mb="lg"
        icon={<BrandTwitter strokeWidth={1.5} />}
      />
      <TextInput
        styles={{
          label: {
            marginBottom: '10px',
          },
        }}
        icon={<BrandLinkedin strokeWidth={1.5} />}
      />
    </SettingsContainer>
  )
}

function CompanyInfo() {
  return (
    <>
      <SettingsContainer
        title="Company profile"
        description="Here you can update your company details"
      >
        <TextInput
          styles={{
            label: {
              marginBottom: '10px',
            },
          }}
          label="Company Name"
          mb="lg"
        />
        <TextInput
          styles={{
            label: {
              marginBottom: '10px',
            },
          }}
          label="Address"
          mb="lg"
        />
        <TextInput
          styles={{
            label: {
              marginBottom: '10px',
            },
          }}
          label="Address Line 2"
          mb="lg"
        />
        <Group grow>
          <TextInput
            styles={{
              label: {
                marginBottom: '10px',
              },
            }}
            label=" City "
            mb="lg"
          />
          <TextInput
            styles={{
              label: {
                marginBottom: '10px',
              },
            }}
            label=" Zip Code "
            mb="lg"
          />
        </Group>
        <TextInput
          styles={{
            label: {
              marginBottom: '10px',
            },
          }}
          label="Email Address"
        />
      </SettingsContainer>
      <Divider my="lg" />
      <CompanySocials />
      <Group position="right" mt="lg">
        <Button variant="light">Cancel</Button>
        <Button ml="sm">Save</Button>
      </Group>
    </>
  )
}

export default CompanyInfo
