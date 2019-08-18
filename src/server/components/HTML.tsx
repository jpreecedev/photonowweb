import React from 'react'
import Helmet from 'react-helmet'

type Props = {
  children: any
  css: string[]
  scripts: string[]
  styles: string
}

const HTML = ({ children, css = [], scripts = [], styles = '' }: Props) => {
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
        {css.filter(Boolean).map(href => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
        <style id="ssr-styles" type="text/css">
          {styles}
        </style>
      </head>
      <body>
        {/* eslint-disable-next-line react/no-danger */}
        <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
        {scripts.filter(Boolean).map(src => (
          <script key={src} src={src} />
        ))}
      </body>
    </html>
  )
}

export default HTML
