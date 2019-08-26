import React from 'react'
import { makeStyles, Theme, useTheme, createStyles } from '@material-ui/core/styles'
import MobileStepper from '@material-ui/core/MobileStepper'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '100%',
      maxHeight: 800,
      flexGrow: 1
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      height: 50
    },
    img: {
      maxWidth: '100%',
      maxHeight: 800,
      overflow: 'hidden',
      display: 'block',
      width: 'auto',
      height: 'auto',
      margin: '0 auto'
    },
    stepper: {
      backgroundColor: 'transparent'
    }
  })
)

function PictureGallery({ pictures, onSelectionChanged }) {
  const classes = useStyles()
  const theme = useTheme()
  const [activeStep, setActiveStep] = React.useState(0)

  if (!pictures || !pictures.length) {
    return null
  }

  const maxSteps = pictures.length

  function handleNext() {
    setActiveStep(prevActiveStep => {
      onSelectionChanged(pictures[prevActiveStep + 1])
      return prevActiveStep + 1
    })
  }

  function handleBack() {
    setActiveStep(prevActiveStep => {
      onSelectionChanged(pictures[prevActiveStep - 1])
      return prevActiveStep - 1
    })
  }

  return (
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.header}>
        <Typography>{pictures[activeStep].label}</Typography>
      </Paper>
      <img
        className={classes.img}
        src={pictures[activeStep].url}
        alt={pictures[activeStep].label}
      />

      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        className={classes.stepper}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    </div>
  )
}

export { PictureGallery }
