import React from 'react'
import { Field } from 'redux-form'

import { StripeInput } from './StripeInput'
import { renderTextField } from './ReduxForm'

const StripeTextField = ({
  InputLabelProps,
  InputProps,
  fullWidth = true,
  label,
  labelErrorMessage,
  component,
  error,
  ...custom
}) => {
  return (
    <Field
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
      component={renderTextField}
      {...custom}
    />
  )
}

export { StripeTextField }
