import React from 'react'
import Helmet from 'react-helmet'
import css from './App.module.css'

import { TestButton } from './components/Button'

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
      <TestButton />
    </div>
  )
}

export default App
