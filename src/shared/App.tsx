import React from 'react'
import Helmet from 'react-helmet'
import { Route } from 'react-router-dom'
import css from './App.module.css'

import { SignIn } from './components/SignIn'
import { SignUp } from './components/SignUp'
import { Checkout } from './components/Checkout'

const App = () => {
  return (
    <div className={css.wrapper}>
      <Helmet
        defaultTitle="React SSR Starter – TypeScript Edition"
        titleTemplate="%s – React SSR Starter – TypeScript Edition"
        link={[
          {
            rel: 'stylesheet',
            href:
              'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
          },
          {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
          }
        ]}
      />
      <>
        <Route path="/" exact component={SignUp} />
        <Route path="/checkout/" component={Checkout} />
        <Route path="/sign-up/" component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
      </>
    </div>
  )
}

export default App
