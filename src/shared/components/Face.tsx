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

const defaultPictures = [
  {
    momentId: '5d6a029e65af2c56f900c6f5',
    url:
      'https://photonow-api-test-bucket.s3.us-east-2.amazonaws.com/fc662a3d-20e1-4c4f-80de-0b2458c84d40.jpg',
    label: '1'
  },
  {
    momentId: '5d6a039b3ea2af58200738c4',
    url:
      'https://photonow-api-test-bucket.s3.us-east-2.amazonaws.com/7a2016a6-8402-45f2-93b7-f0b6cb161663.jpg',
    label: '2'
  },
  {
    momentId: '5d681fe8d4df273f117ca1e2',
    url:
      'https://photonow-api-test-bucket.s3.us-east-2.amazonaws.com/8ded667e-2b2e-43d9-a5b8-b307e7fa03c4.jpg',
    label: '3'
  },
  {
    momentId: '5d6816f29318b8398bd8cdc4',
    url:
      'https://photonow-api-test-bucket.s3.us-east-2.amazonaws.com/eac5c6d6-45bb-4b6f-86cd-ccaae69e1c0a.jpg',
    label: '4'
  }
]

const videoConstraints = {
  width: 300,
  height: 400,
  facingMode: 'user'
}

class Face extends React.Component {
  webcam: any
  Webcam: any

  state = { loaded: false, uploading: false, pictures: defaultPictures }

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
