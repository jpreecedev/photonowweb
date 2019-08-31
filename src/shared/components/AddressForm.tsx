import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import countryList from 'react-select-country-list'
import { useTheme } from '@material-ui/core/styles'

import { renderSelectField, renderTextField } from './ReduxForm'

type Country = {
  label: string
  value: string
}

function AddressForm({ handleSubmit }) {
  const [state, setState] = React.useState<Country[]>([])

  React.useEffect(() => {
    setState(countryList().getData())
  })

  const theme = useTheme()

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Field
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="fname"
              component={renderTextField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="lname"
              component={renderTextField}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              required
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="billing address-line1"
              component={renderTextField}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              autoComplete="billing address-line2"
              component={renderTextField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="billing address-level2"
              component={renderTextField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
              component={renderTextField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="billing postal-code"
              component={renderTextField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <InputLabel htmlFor="country" shrink required>
                Country
              </InputLabel>
              <Field
                required
                defaultValue=""
                name="country"
                id="country"
                style={{
                  color: theme.palette.text.secondary
                }}
                component={renderSelectField}
              >
                <option value="" disabled>
                  -- Please Select --
                </option>
                {state.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default reduxForm({
  form: 'AddressForm'
})(AddressForm)
