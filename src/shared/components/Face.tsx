import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/styles'

import GridContainer from './GridContainer'
import GridItem from './GridItem'
import { server } from '../../client/services'
import Album from './Album'
import Basket from './Basket'

const styles = theme => ({
  paper: {
    padding: theme.spacing(3, 2)
  }
})

const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
  const byteCharacters = atob(b64Data)
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  const blob = new Blob(byteArrays, { type: contentType })
  return blob
}

const videoConstraints = {
  width: 300,
  height: 400,
  facingMode: 'user'
}

class Face extends React.Component {
  webcam: any
  Webcam: any

  state = { loaded: false, uploading: false, pictures: [] }

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
    const imageSrc = this.webcam.getScreenshot().split(',')

    const contentType = 'image/jpeg'
    const blob = b64toBlob(imageSrc[1], contentType)
    this.setState({ uploading: true }, async () => {
      const result = await server.uploadPhotoAsync('/face', 'A Face', blob)
      this.setState({ pictures: result })
    })
  }

  render() {
    const { classes } = this.props
    const { uploading, pictures } = this.state

    if (__SERVER__) {
      return null
    }

    const WebcamInstance = this.Webcam
    if (!WebcamInstance) {
      return null
    }

    return (
      <Container component="main">
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Show us your face...
          </Typography>
          <GridContainer alignItems="center">
            <GridItem>
              <WebcamInstance
                audio={false}
                height={videoConstraints.height}
                ref={this.setRef}
                screenshotFormat="image/jpeg"
                width={videoConstraints.width}
                videoConstraints={videoConstraints}
                screenshotQuality={1}
              />
            </GridItem>
            <GridItem>
              <Button
                disabled={uploading}
                size="large"
                color="primary"
                variant="contained"
                onClick={this.capture}
              >
                Capture photo
              </Button>
            </GridItem>
          </GridContainer>
        </Paper>
        {pictures && pictures.length > 0 && (
          <Paper>
            <Basket />
            <Album pictures={pictures} />
          </Paper>
        )}
      </Container>
    )
  }
}

export default withStyles(styles)(Face)
