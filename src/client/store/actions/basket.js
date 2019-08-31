export const REMOVE_FROM_BASKET = 'REMOVE_FROM_BASKET'
export const ADD_TO_BASKET = 'ADD_TO_BASKET'

export const removeFromBasket = momentId => dispatch => {
  dispatch({
    type: REMOVE_FROM_BASKET,
    payload: {
      momentId
    }
  })
}

export const addToBasket = moment => dispatch => {
  dispatch({
    type: ADD_TO_BASKET,
    payload: {
      moment
    }
  })
}
