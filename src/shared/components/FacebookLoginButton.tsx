import React from 'react'
import Button from '@material-ui/core/Button'
import SvgIcon from '@material-ui/core/SvgIcon'

const FacebookLoginButton = () => {
  if (global.FB) {
    FB.getLoginStatus(function(response) {
      debugger
    })
  }

  return (
    <Button
      fullWidth
      style={{
        backgroundColor: '#4267b2',
        color: 'white',
        letterSpacing: '0.25px'
      }}
    >
      <SvgIcon
        viewBox="0 0 24 24"
        width="48"
        height="48"
        fill="#000000"
        style={{ marginRight: '8px' }}
      >
        <path d="M17.525,9H14V7c0-1.032,0.084-1.682,1.563-1.682h1.868v-3.18C16.522,2.044,15.608,1.998,14.693,2 C11.98,2,10,3.657,10,6.699V9H7v4l3-0.001V22h4v-9.003l3.066-0.001L17.525,9z" />
      </SvgIcon>
      Login with Facebook
    </Button>
  )
}

export { FacebookLoginButton }
