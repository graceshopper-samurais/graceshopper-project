import React from 'react'
import {connect} from 'react-redux'
import {fetchGuestCart} from '../store/guestCart'
import DeleteButton from './DeleteButton'
import UpdateQuantity from './UpdateQuantity'

class GuestCart extends React.Component {
  componentDidMount() {
    this.props.getGuestCart()
  }

  render() {
    const {guestCart} = this.props
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
                  <div>Subtotal: ${item.subtotal}</div>
                  <div>
                    <DeleteButton productOrderId={item.id} />
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
                  return total + lineItem.subtotal
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
    noCart: state.singleCart.noCart,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getGuestCart: () => dispatch(fetchGuestCart())
  }
}

export default connect(mapState, mapDispatch)(GuestCart)
