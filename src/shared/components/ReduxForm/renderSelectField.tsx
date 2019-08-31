import React from 'react'
import Select from '@material-ui/core/Select'

const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  inputProps,
  ...custom
}) => (
  <Select
    errorText={touched && error}
    native
    {...input}
    {...custom}
    {...inputProps}
    inputProps={inputProps}
  >
    {children}
  </Select>
)

export { renderSelectField }
