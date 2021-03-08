import React from 'react'
import {connect} from 'react-redux'
import {fetchGuestCart} from '../store/guestCart'
import DeleteButton from './DeleteButton'
import UpdateQuantity from './UpdateQuantity'

class GuestCart extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log('COMPONENT IS MOUNTING FROM GUEST CART——————')
    this.props.getGuestCart()
  }

  render() {
    const {guestCart} = this.props
    console.log('IN GUEST CART RENDER—————————')
    console.log('props from GUESTCART-----', this.props)
    if (!guestCart) {
      return <p>No items currently in your cart. Happy shopping!</p>
    } else {
      let reducer = (accum, candleObj) => {
        return accum + candleObj.quantity
      }
      const qty = guestCart.reduce(reducer, 0)
      return (
        <div className="cart__cart-header">
          <div> You have {qty} items in your cart </div>
          {guestCart.map(item => {
            return (
              <div key={item.id} className="cart__item">
                <div>
                  <div> {item.name} </div>
                  <img
                    src={item.imageUrl}
                    className="cartImg"
                    alt={item.name}
                  />
                </div>
                <div>
                  <UpdateQuantity
                    productId={item.id}
                    quantity={item.quantity}
                  />
                </div>
                <div>
                  <div>Subtotal: ${item.quantity * item.price}</div>
                  <div>
                    <DeleteButton productId={item.id} />
                  </div>
                </div>
              </div>
            )
          })}
          <div className="cart__total-order">
            <div className="cart__grand-submit">
              <div>
                Grand Total: $
                {guestCart.reduce((total, lineItem) => {
                  return total + lineItem.quantity * lineItem.price
                }, 0)}
              </div>
              {/* <div>
                <Link
                  to={{
                    pathname: '/submitOrder',
                    orderId: guestCart[0].orderId,
                  }}
                >
                  <button className="cart__button">Submit Order</button>
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      )
    }
  }
}

const mapState = state => {
  return {
    guestCart: state.guestCart.guestCart,
    noCart: state.guestCart.noCart,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getGuestCart: () => dispatch(fetchGuestCart())
  }
}

export default connect(mapState, mapDispatch)(GuestCart)
