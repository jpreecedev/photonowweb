import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { CardExpiryElement, CardCVCElement } from 'react-stripe-elements'
import { StripeInput } from './StripeInput'
import { CardNumberElement } from 'react-stripe-elements'

import { renderTextField } from './ReduxForm'

const PaymentForm = () => (
  <>
    <Typography variant="h6" gutterBottom>
      Payment method
    </Typography>
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Field
          required
          id="cardName"
          name="cardName"
          label="Name on card"
          fullWidth
          component={renderTextField}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          required
          label="Credit Card Number"
          id="cardNumber"
          name="cardNumber"
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            inputProps: {
              component: CardNumberElement
            },
            inputComponent: StripeInput
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          required
          id="expDate"
          label="Expiry date"
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            inputProps: {
              component: CardExpiryElement
            },
            inputComponent: StripeInput
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          required
          id="cvv"
          label="CVV"
          helperText="Last three digits on signature strip"
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            inputProps: {
              component: CardCVCElement
            },
            inputComponent: StripeInput
          }}
        />
      </Grid>
    </Grid>
  </>
)

export default reduxForm({
  form: 'paymentForm'
})(PaymentForm)
