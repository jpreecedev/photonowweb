import * as React from 'react'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { basketReducer } from './reducers'

const reducers = combineReducers({
  basket: basketReducer
})

const store = createStore(reducers, applyMiddleware(thunk))

function StateProvider({ children }) {
  return <Provider store={store}>{children}</Provider>
}

export default StateProvider
