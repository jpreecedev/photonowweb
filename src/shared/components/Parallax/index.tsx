import React from 'react'
import classNames from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'

import { parallaxStyle } from './style'

function Parallax({ classes, filter, className, children, style, image, small }) {
  const [state, setState] = React.useState({
    transform: null
  })

  const resetTransform = () => {
    var windowScrollTop = global.pageYOffset / 3
    setState({
      transform: 'translate3d(0,' + windowScrollTop + 'px,0)'
    })
  }

  React.useEffect(() => {
    var windowScrollTop = global.pageYOffset / 3
    setState({
      transform: 'translate3d(0,' + windowScrollTop + 'px,0)'
    })
    global.addEventListener('scroll', resetTransform)
    return () => {
      global.removeEventListener('scroll', resetTransform)
    }
  }, [])

  const parallaxClasses = classNames({
    [classes.parallax]: true,
    [classes.filter]: filter,
    [classes.small]: small,
    [className]: className !== undefined
  })
  return (
    <div
      className={parallaxClasses}
      style={{
        ...style,
        backgroundImage: 'url(' + image + ')',
        ...state
      }}
    >
      {children}
    </div>
  )
}

export default withStyles(parallaxStyle)(Parallax)
