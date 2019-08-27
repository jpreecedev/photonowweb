import React from 'react'
import classNames from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Hidden from '@material-ui/core/Hidden'
import Drawer from '@material-ui/core/Drawer'
import Menu from '@material-ui/icons/Menu'

import { headerStyle } from './style'

function Header({
  classes,
  color = 'white',
  changeColorOnScroll,
  rightLinks,
  leftLinks,
  brand,
  fixed,
  absolute
}) {
  const [state, setState] = React.useState({ mobileOpen: false })

  const handleDrawerToggle = () => {
    setState({ mobileOpen: !state.mobileOpen })
  }

  const headerColorChange = () => {
    const windowsScrollTop = window.pageYOffset
    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body.getElementsByTagName('header')[0].classList.remove(classes[color])
      document.body
        .getElementsByTagName('header')[0]
        .classList.add(classes[changeColorOnScroll.color])
    } else {
      document.body.getElementsByTagName('header')[0].classList.add(classes[color])
      document.body
        .getElementsByTagName('header')[0]
        .classList.remove(classes[changeColorOnScroll.color])
    }
  }

  React.useEffect(() => {
    if (changeColorOnScroll) {
      window.addEventListener('scroll', headerColorChange)
    }
    return () => {
      if (changeColorOnScroll) {
        window.removeEventListener('scroll', headerColorChange)
      }
    }
  }, [])

  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes[color]]: color,
    [classes.absolute]: absolute,
    [classes.fixed]: fixed
  })
  const brandComponent = <Button className={classes.title}>{brand}</Button>
  return (
    <AppBar className={appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>{brandComponent}</div>
      </Toolbar>
      <Hidden mdUp implementation="js">
        <Drawer
          variant="temporary"
          anchor={'right'}
          open={state.mobileOpen}
          classes={{
            paper: classes.drawerPaper
          }}
          onClose={handleDrawerToggle}
        >
          <div className={classes.appResponsive}>
            {leftLinks}
            {rightLinks}
          </div>
        </Drawer>
      </Hidden>
    </AppBar>
  )
}

export default withStyles(headerStyle)(Header)
