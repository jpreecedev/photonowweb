import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ShoppingBasket from '@material-ui/icons/ShoppingBasket'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({
  basketContainer: {
    display: 'flex'
  }
})

function Basket({ basket }) {
  const classes = useStyles()

  if (basket.length === 0) {
    return <p>Your basket is empty</p>
  }

  return (
    <>
      <div className={classes.basketContainer}>
        <ShoppingBasket />
        <p>
          You have {basket.length} picture{basket.length > 1 ? 's' : ''} in your basket
        </p>
      </div>

      <Button
        size="small"
        color="primary"
        to="/checkout"
        variant="outlined"
        component={Link}
      >
        Proceed to checkout
      </Button>
    </>
  )
}

export default connect(state => ({
  basket: state.basket
}))(Basket)
