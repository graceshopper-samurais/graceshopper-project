import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchGuestCart} from '../store/guestCart'
import {fetchCart} from '../store/singleCart'

class CartIcon extends React.Component {
  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.fetchUserCart(this.props.user.id)
    } else {
      this.props.fetchGuestCart()
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
      if (this.props.isLoggedIn) {
        this.props.fetchUserCart(this.props.user.id)
      } else {
        this.props.fetchGuestCart()
      }
    }
  }

  render() {
    if (this.props.isLoggedIn) {
      return (
        <div>
          <Link to={`/users/${this.props.user.id}/cart`}>
            <img src="/icons/cart.png" className="cartIcon" />{' '}
            {this.props.loading
              ? ' '
              : this.props.cart.reduce((totalItems, cartLine) => {
                  return totalItems + cartLine.quantity
                }, 0)}
          </Link>
        </div>
      )
    } else if (!this.props.isLoggedIn) {
      return (
        <div>
          <Link to={`/users/${this.props.user.id}/cart`}>
            <img src="/icons/cart.png" className="cartIcon" />{' '}
            {this.props.loading
              ? ' '
              : this.props.guestCart.reduce((totalItems, cartLine) => {
                  return totalItems + cartLine.quantity
                }, 0)}
          </Link>
        </div>
      )
    }
  }
}

const mapState = state => {
  return {
    user: state.user,
    cart: state.singleCart.cart,
    isLoggedIn: !!state.user.id,
    guestCart: state.guestCart.guestCart,
    loading: state.cartIcon.loading
  }
}

const mapDispatch = dispatch => {
  return {
    fetchGuestCart: () => dispatch(fetchGuestCart()),
    fetchUserCart: id => dispatch(fetchCart(id))
  }
}

export default connect(mapState, mapDispatch)(CartIcon)
