import React from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/singleCart'
import DeleteButton from './DeleteButton'

class FullCart extends React.Component {
  componentDidMount() {
    this.props.getSingleCart(this.props.match.params.id)
  }
  render() {
    const {cart} = this.props
    console.log('props from FULLCART: ', this.props)
    return (
      <div>
        {this.props.cart[0] ? (
          <div>
            {cart.map(item => {
              return (
                <div key={item.id}>
                  <img src={item.product.imageUrl} className="cartImg" />
                  <div>{item.product.name}</div>
                  <div>quantity: {item.quantity}</div>
                  <DeleteButton
                    productOrderId={item.id}
                    userId={this.props.match.params.id}
                  />
                </div>
              )
            })}
          </div>
        ) : (
          <p>No items currently in your cart. Happy shopping!</p>
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
