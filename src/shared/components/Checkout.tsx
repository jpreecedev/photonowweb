import React from 'react'
import { connect } from 'react-redux'
import { Elements, injectStripe } from 'react-stripe-elements'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

import AddressForm from './AddressForm'
import PaymentForm from './PaymentForm'
import Review from './Review'
import { server } from '../../client/services'

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative'
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}))

const CheckoutForm = ({ stripe, basket, form }) => {
  const classes = useStyles()

  const handleNext = async () => {
    const { addressForm, paymentForm } = form

    const billingDetails = {
      name: paymentForm.values.cardName,
      email: addressForm.values.emailAddress,
      addressLine1: addressForm.values.address1,
      addressLine2: addressForm.values.address2,
      city: addressForm.values.city,
      postalCode: addressForm.values.postalCode,
      state: addressForm.values.state,
      country: addressForm.values.country
    }

    const { token } = await stripe.createToken({
      type: 'card',
      name: billingDetails.name,
      address_line1: billingDetails.addressLine1,
      address_line2: billingDetails.addressLine2,
      address_city: billingDetails.city,
      address_state: billingDetails.state,
      address_zip: billingDetails.postalCode,
      address_country: billingDetails.country
    })

    const result = await server.postAsync('/payment', {
      tokenId: token.id,
      billingDetails,
      moments: basket.map(item => item.moment)
    })
    debugger
  }

  return (
    <Paper className={classes.paper}>
      <Typography component="h1" variant="h4" align="center">
        Checkout
      </Typography>
      <AddressForm />
      <PaymentForm />
      <Review />
      <div className={classes.buttons}>
        <Button variant="outlined" color="primary" className={classes.button}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          className={classes.button}
        >
          Place order
        </Button>
      </div>
    </Paper>
  )
}

const InjectedCheckoutForm = injectStripe(CheckoutForm)

function Checkout({ form, basket }) {
  const classes = useStyles()

  return (
    <Elements>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <main className={classes.layout}>
          <InjectedCheckoutForm form={form} basket={basket} />
        </main>
      </Container>
    </Elements>
  )
}

export default connect(state => ({
  basket: state.basket,
  form: state.form
}))(Checkout)
