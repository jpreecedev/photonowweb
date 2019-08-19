import React from 'react'
import { CardNumberElement } from 'react-stripe-elements'
import TextField from '@material-ui/core/TextField'
import { StripeInput } from './StripeInput'

const StripeTextField = ({
  InputLabelProps,
  InputProps,
  fullWidth = true,
  label,
  labelErrorMessage,
  component,
  error
}) => {
  return (
    <TextField
      required
      fullWidth={fullWidth}
      label={error ? labelErrorMessage || `Invalid ${label}` : label}
      error={error}
      InputLabelProps={{
        ...InputLabelProps,
        shrink: true
      }}
      InputProps={{
        ...InputProps,
        inputProps: {
          component
        },
        inputComponent: StripeInput
      }}
    />
  )
}

export { StripeTextField }
