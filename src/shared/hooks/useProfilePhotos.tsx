import React from 'react'

function useProfilePhotos({ accessToken }) {
  const [state, setState] = React.useState({ profile: {}, picture: null, photos: [] })
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${accessToken}&fields=id,first_name,last_name,name,email,about,picture.width(160).height(160),photos`
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
  }, [accessToken])

  if (state.photos && state.photos.length) {
    return state.photos.map(photo => ({
      label: new Date(photo.created_time).toDateString(),
      url: `https://graph.facebook.com/${photo.id}/picture?access_token=${accessToken}`
    }))
  }

  return []
}

export { useProfilePhotos }
