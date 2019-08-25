import React from 'react'
import classNames from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'

import Header from '../../shared/components/Header'
import Footer from '../../shared/components/Footer'
import GridContainer from '../../shared/components/GridContainer'
import GridItem from '../../shared/components/GridItem'
import Parallax from '../../shared/components/Parallax'
import { Profile } from '../../shared/components/Profile'

import { profilePageStyle } from './style'

function ProfilePage({ classes, user, ...rest }) {
  const [state, setState] = React.useState({ profile: {}, picture: null, photos: [] })
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  )

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${user.accessToken}&fields=id,first_name,last_name,name,email,about,picture.width(160).height(160),photos`
      )
      const fullData = await response.json()

      const {
        first_name: firstName,
        last_name: lastName,
        picture,
        photos,
        name
      } = fullData

      const profile = {
        firstName,
        lastName,
        name
      }

      setState({
        ...state,
        profile,
        picture: picture.data,
        photos: photos.data
      })
    }
    fetchData()
  }, [user])

  return (
    <>
      <Header
        color="transparent"
        fixed
        changeColorOnScroll={{
          height: 200,
          color: 'white'
        }}
        {...rest}
      />
      <Parallax filter image={require('../../../assets/crowd.png')} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
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
            </GridContainer>
            <Profile user={user} photos={state.photos} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default withStyles(profilePageStyle)(ProfilePage)
