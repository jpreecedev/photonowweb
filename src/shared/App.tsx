import React from 'react'
import Helmet from 'react-helmet'
import { StripeProvider } from 'react-stripe-elements'
import { Route } from 'react-router-dom'

import './App.css'

import { SecureRoute } from './components/SecureRoute'
import LandingPage from '../pages/LandingPage'
import ProfilePage from '../pages/Profile'
import { SignIn } from './components/SignIn'
import { SignUp } from './components/SignUp'
import { Checkout } from './components/Checkout'
import { LoginFailed } from './components/LoginFailed'
import { Setup } from './components/Setup'

function App() {
  const [state, setState] = React.useState({ stripe: null })

  React.useEffect(() => {
    setState({ stripe: window.Stripe('pk_test_nOsp35KuZTcqIXPzx3Gpxhjv') })
  }, [])

  if (!state.stripe) {
    return null
  }

  return (
    <StripeProvider stripe={state.stripe}>
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
        <Route path="/sign-up" component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Route path="/login-failed" exact component={LoginFailed} />
        <SecureRoute path="/checkout" component={Checkout} />
        <SecureRoute path="/profile" exact component={ProfilePage} />
        <SecureRoute path="/setup" exact component={Setup} />
      </>
    </StripeProvider>
  )
}

export default App
