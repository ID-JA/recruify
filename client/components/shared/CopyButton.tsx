import { ActionIcon } from '@mantine/core'
import { useState } from 'react'
import { Check, Copy } from 'tabler-icons-react'

function CopyButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)

  return (
    <div>
      <ActionIcon
        title="Copy link"
        color="blue"
        size="sm"
        variant="default"
        radius="xl"
        onClick={() => {
          setCopied(true)
          navigator.clipboard.writeText(url)
          setTimeout(() => setCopied(false), 2000)
        }}
      >
        {copied ? (
          <Check size="18px" strokeWidth="1.02px" />
        ) : (
          <Copy size="18px" strokeWidth="1.02px" />
        )}
      </ActionIcon>
    </div>
  )
}

export default CopyButton
