import React from 'react'
import classNames from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'

import Header from '../../shared/components/Header'
import Footer from '../../shared/components/Footer'
import GridContainer from '../../shared/components/GridContainer'
import GridItem from '../../shared/components/GridItem'
import Parallax from '../../shared/components/Parallax'
import { PictureGallery } from '../../shared/components/PictureGallery'

import { profilePageStyle } from './style'

function ProfilePage({ classes, user, ...rest }) {
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  )

  return (
    <>
      <Header color="transparent" fixed {...rest} />
      <Parallax small filter image={require('../../../assets/crowd.png')} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12}>
                <div className={classes.profile}>
                  <div>
                    {state.picture && (
                      <img src={state.picture.url} alt="..." className={imageClasses} />
                    )}
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>{state.profile.name}</h3>
                  </div>
                </div>
              </GridItem>
              <GridItem xs={12}>
                <PictureGallery pictures={mappedPhotos} />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default withStyles(profilePageStyle)(ProfilePage)
