import React from 'react'
import { fade, useTheme } from '@material-ui/core/styles'

const StripeInput = ({
  component: Component,
  inputRef,
  'aria-invalid': ariaInvalid,
  'aria-describedby': ariaDescribeBy,
  defaultValue,
  required,
  onKeyDown,
  onKeyUp,
  readOnly,
  autoComplete,
  autoFocus,
  type,
  name,
  rows,
  ...other
}) => {
  const theme = useTheme()
  const [mountNode, setMountNode] = React.useState(null)

  React.useImperativeHandle(
    inputRef,
    () => ({
      focus: () => mountNode.focus()
    }),
    [mountNode]
  )
  return (
    <Component
      onReady={setMountNode}
      style={{
        base: {
          color: theme.palette.text.primary,
          fontSize: `${theme.typography.htmlFontSize}px`,
          fontFamily: theme.typography.fontFamily,
          '::placeholder': {
            display: fade(theme.palette.text.primary, 0.42)
          }
        },
        invalid: {
          color: theme.palette.text.primary
        }
      }}
      {...other}
    />
  )
}

export { StripeInput }
