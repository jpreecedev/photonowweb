import React from 'react'
import classNames from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'

import { infoStyle } from './style'

function InfoArea({ ...props }) {
  const { classes, title, description, iconColor, vertical } = props
  const iconWrapper = classNames({
    [classes.iconWrapper]: true,
    [classes[iconColor]]: true,
    [classes.iconWrapperVertical]: vertical
  })
  const iconClasses = classNames({
    [classes.icon]: true,
    [classes.iconVertical]: vertical
  })
  return (
    <div className={classes.infoArea}>
      <div className={iconWrapper}>
        <props.icon className={iconClasses} />
      </div>
      <div className={classes.descriptionWrapper}>
        <h4 className={classes.title}>{title}</h4>
        <p className={classes.description}>{description}</p>
      </div>
    </div>
  )
}

InfoArea.defaultProps = {
  iconColor: 'gray'
}

export default withStyles(infoStyle)(InfoArea)
