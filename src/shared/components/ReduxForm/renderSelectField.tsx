import React from 'react'
import Select from '@material-ui/core/Select'

const renderSelectField = ({ input, label, meta, children, inputProps, ...custom }) => (
  <Select native {...input} {...custom} {...inputProps} inputProps={inputProps}>
    {children}
  </Select>
)

export { renderSelectField }
