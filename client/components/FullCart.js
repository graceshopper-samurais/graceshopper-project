import React from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/singleCart'

class FullCart extends React.Component {
  componentDidMount() {
    this.props.getSingleCart(this.props.match.params.id)
  }

  // componentWillUnmount() {
  //   // No items currently in your cart. Happy shopping!
  //   this.props.noCart = true
  // }

  render() {
    const {cart} = this.props
    console.log('props from FULLCART: ', this.props)
    if (this.props.noCart) {
      return <p>No items currently in your cart. Happy shopping!</p>
    } else {
      return (
        <div className="cartContainer">
          <div>
            {cart.map(item => {
              return (
                <div key={item.id}>
                  <img src={item.product.imageUrl} className="cartImg" />
                  <div>{item.product.name}</div>
                  <div>quantity: {item.quantity}</div>
                </div>
              )
            })}
          </div>
        </div>
      )
    }
  }
}

const mapState = state => {
  return {
    cart: state.singleCart.cart,
    noCart: state.singleCart.noCart
  }
}

const mapDispatch = dispatch => {
  return {
    getSingleCart: id => dispatch(fetchCart(id))
  }
}

export default connect(mapState, mapDispatch)(FullCart)
