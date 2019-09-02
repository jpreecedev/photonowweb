import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import CloudDownload from '@material-ui/icons/CloudDownload'

import { server } from '../../client/services'
import { Spinner } from './Spinner'

const useStyles = makeStyles(theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  avatar: {
    margin: 10,
    width: 60,
    height: 60
  },
  listItem: {
    padding: theme.spacing(1, 0)
  }
}))

function OrderConfirmation({ match }) {
  const classes = useStyles()
  const [state, setState] = React.useState<IOrder>(null)

  React.useEffect(() => {
    const fetchData = async () => {
      const order: IOrder = await server.getAsync(`/order/${match.params.orderId}`)
      setState(order)
    }
    fetchData()
  }, [])

  if (!state) {
    return <Spinner />
  }

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Your order
          </Typography>
          <List disablePadding>
            {state.moments.map(moment => (
              <ListItem className={classes.listItem} key={moment.filename}>
                <ListItemAvatar>
                  <Avatar
                    alt={moment.filename}
                    src={moment.resizedLocation}
                    className={classes.avatar}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={moment.filename}
                  secondary="High quality version ready to download."
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="Download" href={moment.location}>
                    <CloudDownload />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      </main>
    </Container>
  )
}

export { OrderConfirmation }
