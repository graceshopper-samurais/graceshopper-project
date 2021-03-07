import React from 'react'
import {connect} from 'react-redux'
import {fetchCart, fetchGuestCart} from '../store/singleCart'
import DeleteButton from './DeleteButton'

class GuestCart extends React.Component {
  componentDidMount() {
    this.props.getGuestCart()
  }

  render() {
    const {cart} = this.props
    console.log('props from GUESTCART: ', this.props)
    if (!cart) {
      return <p>No items currently in your cart. Happy shopping!</p>
    } else {
      let reducer = (accum, candleObj) => {
        return accum + candleObj.quantity
      }
      const qty = cart.reduce(reducer, 0)
      return (
        <div className="cart__cart-header">
          <div> You have {qty} items in your cart </div>
          {cart.map((item) => {
            return (
              <div key={item.id}>
                <img src={item.imageUrl} className="cartImg" alt={item.name} />
                <div> {item.name} </div>
                <div> Quantity: {item.quantity} </div>
                <select>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
                <div>
                  <DeleteButton
                    productOrderId={item.id}
                    // userId={this.props.match.params.id}
                  />
                </div>
              </div>
            )
          })}
        </div>
      )
    }
  }
}

const mapState = (state) => {
  return {
    cart: state.singleCart.cart,
    noCart: state.singleCart.noCart,
    isLoggedIn: !!state.user.id,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getSingleCart: (id) => dispatch(fetchCart(id)),
    getGuestCart: () => dispatch(fetchGuestCart()),
  }
}

export default connect(mapState, mapDispatch)(GuestCart)
