import React from 'react'
import Helmet from 'react-helmet'
import { Route } from 'react-router-dom'
import { StripeProvider } from 'react-stripe-elements'

import './App.css'

import LandingPage from '../pages/LandingPage'
import { SignIn } from './components/SignIn'
import { SignUp } from './components/SignUp'
import { Checkout } from './components/Checkout'
import { LoginFailed } from './components/LoginFailed'
import { Profile } from './components/Profile'

class App extends React.Component {
  state = { stripe: null }

  componentDidMount() {
    this.setState({ stripe: window.Stripe('pk_test_nOsp35KuZTcqIXPzx3Gpxhjv') })
  }
  render() {
    return (
      <StripeProvider stripe={this.state.stripe}>
        <>
          <Helmet
            defaultTitle="React SSR Starter – TypeScript Edition"
            titleTemplate="%s – React SSR Starter – TypeScript Edition"
            link={[
              {
                rel: 'stylesheet',
                type: 'text/css',
                href:
                  'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons'
              }
            ]}
          />
          <Route path="/" exact component={LandingPage} />
          <Route path="/checkout/" component={Checkout} />
          <Route path="/sign-up/" component={SignUp} />
          <Route path="/sign-in" exact component={SignIn} />
          <Route path="/login-failed" exact component={LoginFailed} />
          <Route path="/profile" exact component={Profile} />
        </>
      </StripeProvider>
    )
  }
}

export default App
