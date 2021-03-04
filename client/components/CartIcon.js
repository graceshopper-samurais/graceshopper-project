import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
// import {cart} from '../../public/icons'

const CartIcon = props => {
  // console.log('this is props', props)
  return (
    <div>
      {/* <img src={cart} /> */}
      <Link to={`/users/${props.user.id}/cart`}>
        <img src="./icons/cart.png" className="cartIcon" /> 0
      </Link>
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState, null)(CartIcon)
