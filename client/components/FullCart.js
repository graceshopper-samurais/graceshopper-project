import React from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/singleCart'
import DeleteButton from './DeleteButton'
import GuestCart from './GuestCart'
import {Link} from 'react-router-dom'
import UpdateQuantity from './UpdateQuantity'

class FullCart extends React.Component {
  constructor(props) {
    super(props)
  }

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
    if (this.props.isLoggedIn) {
      if (this.props.noCart) {
        return <p>No items currently in your cart. Happy shopping!</p>
      } else {
        return (
          <div className="cart__cart-header">
            <div> You have the following items in your cart </div>
            {cart.map((item) => {
              return (
                <div key={item.id}>
                  <img
                    src={item.product.imageUrl}
                    className="cartImg"
                    alt={item.product.name}
                  />
                  <div> {item.product.name} </div>
                  <UpdateQuantity
                    userId={this.props.match.params.id}
                    productId={item.product.id}
                    quantity={item.quantity}
                  />
                  <div>Price each: ${item.product.price}</div>
                  <div>Subtotal: ${item.subtotal}</div>
                  <div>
                    <DeleteButton
                      productOrderId={item.id}
                      userId={this.props.match.params.id}
                    />
                  </div>
                </div>
              )
            })}

            <div>
              Grand Total: $
              {cart.reduce((total, lineItem) => {
                return total + lineItem.subtotal
              }, 0)}
            </div>
            <div>
              <Link
                to={{
                  pathname: '/submitOrder',
                  userId: this.props.userId,
                  orderId: cart[0].orderId,
                }}
              >
                <button>Submit Order</button>
              </Link>
            </div>
          </div>
        )
      }
    } else {
      return <GuestCart />
    }
  }
}

const mapState = (state) => {
  return {
    cart: state.singleCart.cart,
    noCart: state.singleCart.noCart,
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getSingleCart: (id) => dispatch(fetchCart(id)),
  }
}

export default connect(mapState, mapDispatch)(FullCart)
