import * as React from 'react'
import * as express from 'express'
import { renderToString } from 'react-dom/server'
import { StaticRouter as Router } from 'react-router-dom'
import App from '../../shared/App'
import Html from '../components/HTML'

const serverRenderer: any = () => (req: express.Request, res: express.Response) => {
  const content = renderToString(
    <Router location={req.url} context={{}}>
      <App />
    </Router>
  )

  return res.send(
    '<!doctype html>' +
      renderToString(
        <Html
          css={[res.locals.assetPath('bundle.css'), res.locals.assetPath('vendor.css')]}
          scripts={[res.locals.assetPath('bundle.js'), res.locals.assetPath('vendor.js')]}
        >
          {content}
        </Html>
      )
  )
}

export default serverRenderer
