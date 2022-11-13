import { Button, Group, TextInput } from '@mantine/core'
import { SettingSection } from '../SettingsContainer'

function CompanyInfo() {
  return (
    <>
      <SettingSection
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
      </SettingSection>
      <Group position="right" mt="lg">
        <Button variant="light">Cancel</Button>
        <Button ml="sm">Save</Button>
      </Group>
    </>
  )
}

export { CompanyInfo }
