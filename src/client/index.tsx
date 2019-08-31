import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'

import App from '../shared/App'
import { theme } from '../shared/Theme'
import { StateProvider } from '../client/store'

function Main() {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#ssr-styles')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }, [])

  return (
    <Router>
      <StateProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </StateProvider>
    </Router>
  )
}

hydrate(<Main />, document.getElementById('app'))

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept()
  }
}
