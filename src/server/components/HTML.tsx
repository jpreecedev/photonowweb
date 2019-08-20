/* eslint-disable react/no-danger */

import React, { FunctionComponent } from 'react'
import Helmet from 'react-helmet'

type Props = {
  children: any
  css: string[]
  headScripts: string[]
  scripts: string[]
  styles: string
}

const HTML: FunctionComponent<Props> = ({
  children,
  css = [],
  scripts = [],
  headScripts = [],
  styles = ''
}) => {
  const head = Helmet.renderStatic()
  return (
    <html lang="">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}
        {headScripts.filter(Boolean).map(src => (
          <script key={src} src={src} />
        ))}
        {css.filter(Boolean).map(href => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
        <style id="ssr-styles" type="text/css">
          {styles}
        </style>
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.fbAsyncInit = function() {
            FB.init({
              appId            : '${process.env.FACEBOOK_APP_ID}',
              autoLogAppEvents : true,
              xfbml            : true,
              version          : 'v4.0'
            });
          };`
          }}
        ></script>
        <script async defer src="https://connect.facebook.net/en_US/sdk.js"></script>
        <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
        {scripts.filter(Boolean).map(src => (
          <script key={src} src={src} />
        ))}
      </body>
    </html>
  )
}

export default HTML
