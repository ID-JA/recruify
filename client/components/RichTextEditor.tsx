/* eslint-disable @typescript-eslint/no-explicit-any */
// RichText.tsx in your components folder
import { createStyles } from '@mantine/core'
import { RichTextEditorProps } from '@mantine/rte'
import { ToolbarControl } from '@mantine/rte/lib/components/Toolbar/controls'
import dynamic from 'next/dynamic'
import { Controller, FieldValues, Path, UseFormRegister } from 'react-hook-form'

const MantineRTE = dynamic(() => import('@mantine/rte'), {
  // Disable during server side rendering
  ssr: false,

  // Render anything as fallback on server, e.g. loader or html content without editor
  loading: () => <div>Loading Rich Text Editor...</div>,
})

const editorControls: ToolbarControl[][] = [
  ['bold', 'italic', 'underline', 'link', 'image'],
  ['unorderedList', 'h1', 'h2', 'h3'],
  ['sup', 'sub'],
  ['alignLeft', 'alignCenter', 'alignRight'],
]

const useStyles = createStyles(() => ({
  fieldWrapper: {
    marginBottom: '20px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 500,
    display: 'inline-block',
    color: '#212529',
  },
  errorMessage: {
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

type Props<TFormValues extends FieldValues> = {
  label?: string
  description?: string
  control?: any
  name: Path<TFormValues>
  register?: UseFormRegister<TFormValues>
  error?: string
} & Omit<RichTextEditorProps, 'name'>

function RichTextEditor<TFormValues extends Record<string, unknown>>({
  label,
  description,
  error,
  control,
  name,
  register,
  ...props
}: Props<TFormValues>) {
  const { classes, cx } = useStyles()
  return (
    <div className={classes.fieldWrapper}>
      <label className={classes.label}>{label}</label>
      {description && <span>{description}</span>}
      <Controller
        render={({ field }) => (
          <MantineRTE
            mb={5}
            sticky
            controls={editorControls}
            className={cx({ [classes.invalid]: error })}
            {...(register && register(name))}
            {...field}
            {...props}
          />
        )}
        control={control}
        name={name}
      />
      {error && (
        <span className={classes.errorMessage} key="job-description-error">
          {error}
        </span>
      )}
    </div>
  )
}

export default RichTextEditor
