import * as React from 'react'
import * as express from 'express'
import { renderToString } from 'react-dom/server'
import { StaticRouter as Router } from 'react-router-dom'
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles'

import App from '../../shared/App'
import Html from '../components/HTML'
import { theme } from '../../shared/Theme'
import { StateProvider } from '../../client/store'

const serverRenderer: any = () => (req: express.Request, res: express.Response) => {
  const sheets = new ServerStyleSheets()
  const content = renderToString(
    sheets.collect(
      <StateProvider>
        <ThemeProvider theme={theme}>
          <Router location={req.url} context={{}}>
            <App />
          </Router>
        </ThemeProvider>
      </StateProvider>
    )
  )

  return res.send(
    '<!doctype html>' +
      renderToString(
        <Html
          css={[res.locals.assetPath('bundle.css'), res.locals.assetPath('vendor.css')]}
          styles={sheets.toString()}
          headScripts={['https://js.stripe.com/v3/']}
          scripts={[res.locals.assetPath('bundle.js'), res.locals.assetPath('vendor.js')]}
        >
          {content}
        </Html>
      )
  )
}

export default serverRenderer
