import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const CartIcon = props => {
  console.log('this is props from CARTICON', props)
  return (
    <div>
      <Link to={`/users/${props.user.id}/cart`}>
        <img src="/icons/cart.png" className="cartIcon" /> 0
      </Link>
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user,
    cart: state.singleCart
  }
}

export default connect(mapState, null)(CartIcon)
