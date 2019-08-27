import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

import { landingPageStyle } from '../../pages/LandingPage/style'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1)
    },
    buttonBottom: {
      marginBottom: '20rem'
    }
  })
)

function LandingPage({ ...rest }) {
  const classes = useStyles()
  return (
    <>
      <div
        style={{
          textAlign: 'center',
          background: `linear-gradient(to bottom,rgba(92,77,66,.8) 0,rgba(92,77,66,.8) 100%),url('${require('../../../assets/background.jpg')}')`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'scroll',
          backgroundSize: 'cover',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
      >
        <div>
          <img
            src={require('../../../assets/oktoberfest.png')}
            alt="Oktoberfest"
            style={{
              maxHeight: '300px',
              width: 'auto',
              height: 'auto'
            }}
          />
        </div>

        <div className={classes.buttonBottom}>
          <Button
            component={Link}
            to="/sign-in"
            variant="contained"
            color="primary"
            size="large"
            className={classes.margin}
          >
            Get Started
          </Button>
        </div>
      </div>
    </>
  )
}

export default withStyles(landingPageStyle)(LandingPage)
