import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { Elements, CardExpiryElement, CardCVCElement } from 'react-stripe-elements'
import { StripeTextField } from './StripeTextField'
import { CardNumberElement } from 'react-stripe-elements'
import { StripeInput } from './StripeInput'

const PaymentForm = () => (
  <Elements>
    <>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField required id="cardName" label="Name on card" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <StripeTextField label="Credit Card Number" component={CardNumberElement} />
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
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </>
  </Elements>
)

export { PaymentForm }
