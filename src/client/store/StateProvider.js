import * as React from 'react'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import throttle from 'lodash.throttle'
import { reducer as formReducer } from 'redux-form'

import { basketReducer } from './reducers'
import { localStorage } from '../services'

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const persistedState = localStorage.loadState()

const reducers = combineReducers({
  basket: basketReducer,
  form: formReducer
})

const store = createStore(
  reducers,
  persistedState,
  composeEnhancers(applyMiddleware(thunk))
)

store.subscribe(
  throttle(() => {
    localStorage.saveState({
      basket: store.getState().basket
    })
  }, 200)
)

function StateProvider({ children }) {
  return <Provider store={store}>{children}</Provider>
}

export default StateProvider
