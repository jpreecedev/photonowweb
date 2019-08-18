import React from 'react'
import classNames from 'classnames'

import makeStyles from '@material-ui/core/styles/makeStyles'
import Button from '@material-ui/core/Button'

import buttonStyle from './style'

const makeComponentStyles = makeStyles(() => ({
  ...buttonStyle
}))

const RegularButton = React.forwardRef((props, ref) => {
  const {
    color,
    round,
    children,
    fullWidth,
    disabled,
    simple,
    size,
    block,
    link,
    justIcon,
    className,
    ...rest
  } = props

  const classes = makeComponentStyles()

  const btnClasses = classNames({
    [classes.button]: true,
    [classes[size]]: size,
    [classes[color]]: color,
    [classes.round]: round,
    [classes.fullWidth]: fullWidth,
    [classes.disabled]: disabled,
    [classes.simple]: simple,
    [classes.block]: block,
    [classes.link]: link,
    [classes.justIcon]: justIcon,
    [className]: className
  })
  return (
    <Button {...rest} ref={ref} className={btnClasses}>
      {children}
    </Button>
  )
})

export default RegularButton
