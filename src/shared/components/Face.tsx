import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'

import { withStyles } from '@material-ui/styles'

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      padding: theme.spacing(3)
    }
  }
})

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user'
}

class Face extends React.Component {
  webcam: any
  Webcam: any

  state = { loaded: false }

  constructor(props) {
    super(props)

    if (__SERVER__) {
      return null
    }

    import('react-webcam').then(Webcam => {
      this.Webcam = Webcam.default
      this.setState({ loaded: true })
    })
  }

  setRef = webcam => {
    this.webcam = webcam
  }

  capture = () => {
    const imageSrc = this.webcam.getScreenshot()
    console.log(imageSrc)
  }

  render() {
    const { classes } = this.props

    if (__SERVER__) {
      return null
    }

    const WebcamInstance = this.Webcam
    if (!WebcamInstance) {
      return null
    }

    return (
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Show us your face...
          </Typography>
          <WebcamInstance
            audio={false}
            height={videoConstraints.height}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={videoConstraints.width}
            videoConstraints={videoConstraints}
          />
          <button onClick={this.capture}>Capture photo</button>
        </Paper>
      </Container>
    )
  }
}

export default withStyles(styles)(Face)
