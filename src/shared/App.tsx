import React from 'react'
import Helmet from 'react-helmet'
import Features from '../shared/components/Features'
import favicon from '../shared/assets/favicon.png'
import { ReactComponent as ReactLogo } from './assets/react.svg'
import css from './App.module.css'

const App = () => {
  return (
    <div className={css.wrapper}>
      <Helmet
        defaultTitle="React SSR Starter – TypeScript Edition"
        titleTemplate="%s – React SSR Starter – TypeScript Edition"
        link={[{ rel: 'icon', type: 'image/png', href: favicon }]}
      />
      <h1>
        <ReactLogo className={css.reactLogo} /> React + Express – SSR Starter – TypeScript
        Edition
      </h1>
      <Features />
    </div>
  )
}

export default App
