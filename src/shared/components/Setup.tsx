import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { green } from '@material-ui/core/colors'

import { PictureGallery } from './PictureGallery'
import { useProfilePhotos } from '../hooks/useProfilePhotos'
import { server } from '../../client/services'

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative'
  },
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
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  },
  submit: {
    margin: '0 auto'
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative'
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
}))

async function loadImageAsBlob(url: string) {
  return await fetch(url).then(response => response.blob())
}

function Setup({ user }) {
  const classes = useStyles()
  const profilePhotos = useProfilePhotos(user)
  const [uploading, setUploading] = React.useState(false)
  const [state, setState] = React.useState(null)

  async function uploadFace() {
    setUploading(true)
    const selectedProfilePhoto = state || profilePhotos[0]
    const imageBlob = await loadImageAsBlob(selectedProfilePhoto.url)
    await server.uploadPhotoAsync('/face', `${selectedProfilePhoto.label}.jpg`, imageBlob)
    setUploading(false)
  }

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            We need your face...
          </Typography>
          <PictureGallery
            pictures={profilePhotos}
            onSelectionChanged={picture => setState(picture)}
          />

          <div className={classes.wrapper}>
            <Button
              type="button"
              variant="contained"
              color="primary"
              fullWidth
              className={classes.submit}
              onClick={async () => await uploadFace()}
            >
              This is a good picture clear picture of only my face
            </Button>
            {uploading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </Paper>
      </main>
    </Container>
  )
}

export { Setup }
