import React from 'react'
import css from './Features.module.css'

const Features = () => (
  <React.Fragment>
    <h2>Features</h2>
    <ul className={css.wrapper}>
      <li className={css.react}>React 16.x (latest)</li>
      <li className={css.webpack}>Webpack 4</li>
      <li className={css.hot}>Babel 7</li>
      <li className={css.hot}>ESLint 5</li>
      <li className={css.hot}>TypeScript (using Babel 7)</li>
      <li className={css.hot}>Jest 24</li>
      <li>React Testing Library</li>
      <li>React Router 5</li>
      <li>Immer</li>
      <li>Reselect</li>
      <li>React Helmet</li>
      <li>Express Webserver + Server Side Rerendering</li>
      <li>CSS Modules</li>
      <li>PostCSS</li>
      <li>HMR (buggy, see Readme)</li>
    </ul>
  </React.Fragment>
)

export default Features
