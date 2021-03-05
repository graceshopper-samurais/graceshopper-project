import React from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/singleCart'

class FullCart extends React.Component {
  componentDidMount() {
    this.props.getSingleCart(this.props.match.params.id)
  }
  render() {
    const {cart} = this.props
    console.log('props from FULLCART: ', this.props)
    return (
      <div>
        {cart[0] ? (
          <div className="cart__cart-header">
            <div> You have {cart.length} items in your cart </div>
            {cart.map(item => {
              return (
                <div key={item.id}>
                  <img src={item.product.imageUrl} className="cartImg" />
                  <div> {item.product.name} </div>
                  <div> Quantity: {item.quantity} </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="cart__cart-header">
            <p>No items currently in your cart. Happy shopping!</p>
          </div>
        )}
      </div>
    )
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
