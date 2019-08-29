import * as React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { Spinner } from './Spinner'
import { server } from '../../client/services'

function useSecureRoute() {
  const [state, setState] = React.useState({
    complete: false,
    authenticated: false,
    user: null
  })

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await server.getAsync('/token/check')
        setState({ complete: true, authenticated: true, user })
      } catch (error) {
        setState({ complete: true, authenticated: false, user: null })
      }
    }
    fetchData()
  }, [])

  return state
}

const SecureRoute = ({ component: Component, ...rest }) => {
  const { complete, authenticated, user } = useSecureRoute()
  return (
    <Route
      {...rest}
      render={props => {
        if (complete && authenticated) {
          return <Component {...props} user={user} />
        }
        if (complete && !authenticated) {
          return <Redirect to="/sign-in" {...props} />
        }
        return <Spinner />
      }}
    />
  )
}

export { SecureRoute }
