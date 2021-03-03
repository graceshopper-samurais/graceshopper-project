import React from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/singleCart'

class FullCart extends React.Component {
  render() {
    return <div>Testing, testing</div>
  }
}

const mapState = state => {
  return {
    cart: state.singleCart
  }
}

const mapDispatch = dispatch => {
  return {
    getSingleCart: id => dispatch(fetchCart(id))
  }
}

export default connect(mapState, mapDispatch)(FullCart)
