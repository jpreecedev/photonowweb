import React from 'react'
import classNames from 'classnames'
import { List, ListItem, withStyles } from '@material-ui/core'

import { footerStyle } from './style'

function Footer({ ...props }) {
  const { classes, whiteFont } = props
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  })
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont
  })
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://www.creative-tim.com/presentation?ref=mkr-footer"
                className={classes.block}
                target="_blank"
              >
                About us
              </a>
            </ListItem>
          </List>
        </div>
        <div className={classes.right}>
          &copy; {1900 + new Date().getYear()}, PhotoNow productions... #NoMoreSelfies.
        </div>
      </div>
    </footer>
  )
}

export default withStyles(footerStyle)(Footer)
