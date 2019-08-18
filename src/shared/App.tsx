import React from 'react'
import Helmet from 'react-helmet'
import { Route } from 'react-router-dom'
import './App.css'

import LandingPage from '../pages/LandingPage'
import { SignIn } from './components/SignIn'
import { SignUp } from './components/SignUp'
import { Checkout } from './components/Checkout'

const App = () => {
  return (
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
    </>
  )
}

export default App
