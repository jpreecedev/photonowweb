import React from 'react'
import classNames from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'
import Header from '../../shared/components/Header'
import Footer from '../../shared/components/Footer'
import GridContainer from '../../shared/components/GridContainer'
import GridItem from '../../shared/components/GridItem'
import Parallax from '../../shared/components/Parallax'
import { landingPageStyle } from '../../pages/LandingPage/style'

import ProductSection from './Sections/ProductSection'

const dashboardRoutes = []

function LandingPage({ classes, ...rest }) {
  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="PhotoNow"
        fixed
        changeColorOnScroll={{
          height: 400,
          color: 'white'
        }}
        {...rest}
      />
      <Parallax filter image={require('../../../assets/crowd.png')}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>PhotoNow.app</h1>
              <h4>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
                obcaecati dolor debitis voluptates eligendi minus quaerat! Dolorum,
                sapiente! Animi dolore sequi vero quod est? Pariatur officiis vitae quam
                velit consectetur.
              </h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection />
          <ProductSection />
          <ProductSection />
          <ProductSection />
          <ProductSection />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default withStyles(landingPageStyle)(LandingPage)
