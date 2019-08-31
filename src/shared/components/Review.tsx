import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

import { Actions } from '../../client/store'

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0)
  },
  total: {
    fontWeight: theme.typography.fontWeightBold
  },
  title: {
    marginTop: theme.spacing(2)
  },
  avatar: {
    margin: 10,
    width: 60,
    height: 60
  }
}))

function Review({ basket, dispatch }) {
  const classes = useStyles()
  return (
    <List disablePadding>
      {basket.map(product => (
        <ListItem className={classes.listItem} key={product.moment.label}>
          <ListItemAvatar>
            <Avatar
              alt={product.moment.label}
              src={product.moment.url}
              className={classes.avatar}
            />
          </ListItemAvatar>
          <ListItemText
            primary={product.moment.label}
            secondary={`£${(product.moment.price / 100).toFixed(2)}`}
          />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => dispatch(Actions.basket.removeFromBasket(product.moment))}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
      <ListItem className={classes.listItem}>
        <ListItemText primary="Total" />
        <Typography variant="subtitle1" className={classes.total}>
          &pound;
          {(
            basket.reduce((acc, current) => (acc += current.moment.price), 0) / 100
          ).toFixed(2)}
        </Typography>
      </ListItem>
    </List>
  )
}
export default connect(state => ({ basket: state.basket }))(Review)
