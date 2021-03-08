import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const CartIcon = props => {
  // console.log('this is props from CARTICON', props)
  if (props.isLoggedIn) {
    return (
      <div>
        <Link to={`/users/${props.user.id}/cart`}>
          <img src="/icons/cart.png" className="cartIcon" />{' '}
          {props.cart.reduce((totalItems, cartLine) => {
            return totalItems + cartLine.quantity
          }, 0)}
        </Link>
      </div>
    )
  } else if (!props.isLoggedIn) {
    return (
      <div>
        <Link to={`/users/${props.user.id}/cart`}>
          <img src="/icons/cart.png" className="cartIcon" />{' '}
          {props.guestCart.reduce((totalItems, cartLine) => {
            return totalItems + cartLine.quantity
          }, 0)}
        </Link>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    cart: state.singleCart.cart,
    isLoggedIn: !!state.user.id,
    guestCart: state.guestCart.guestCart
  }
}

export default connect(mapState, null)(CartIcon)
