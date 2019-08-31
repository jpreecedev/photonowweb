export const ADD_TO_BASKET = 'ADD_TO_BASKET'

export const addToBasket = moment => dispatch => {
  dispatch({
    type: ADD_TO_BASKET,
    payload: {
      moment
    }
  })
}
