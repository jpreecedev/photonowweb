import React from 'react'
import { connect } from 'react-redux'
import { Elements } from 'react-stripe-elements'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

import AddressForm from './AddressForm'
import PaymentForm from './PaymentForm'
import Review from './Review'

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

function Checkout() {
  const classes = useStyles()

  return (
    <Elements>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Typography component="h2" align="center">
              Shipping Address
            </Typography>
            <AddressForm />
            <Typography component="h2" variant="h4" align="center">
              Payment Details
            </Typography>
            <PaymentForm />
            <Typography component="h2" variant="h4" align="center">
              Review your order
            </Typography>
            <Review />
          </Paper>
        </main>
      </Container>
    </Elements>
  )
}

export default connect(state => ({ basket: state.basket }))(Checkout)
