import * as React from 'react'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import throttle from 'lodash.throttle'

import { basketReducer } from './reducers'
import { localStorage } from '../services'

const persistedState = localStorage.loadState()

const reducers = combineReducers({
  basket: basketReducer
})

const store = createStore(reducers, persistedState, applyMiddleware(thunk))

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
