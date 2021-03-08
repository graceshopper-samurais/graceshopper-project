import React from 'react'
import {connect} from 'react-redux'
import {addToCartThunk} from '../store/singleCart'
import {addToGuestCartThunk} from '../store/guestCart'

// const {product, userId, addToCart} = this.props

class AddToCartButton extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    if (this.props.isLoggedIn) {
      const cart = this.props.userCart
      console.log('cart——————', cart)
      const indx = cart
        .map(item => item.product.id)
        .indexOf(this.props.product.id)
      if (indx > -1 && cart[indx].quantity >= 8) {
        alert('There is a maximum of eight items!')
      } else {
        this.props.addToCart(this.props.userId, this.props.product.id)
      }
    } else {
      const cart = this.props.guestCart
      console.log('this.props———————', this.props)
      const indx = cart.map(item => item.id).indexOf(this.props.product.id)
      if (indx > -1 && cart[indx].quantity >= 8) {
        alert('There is a maximum of eight items!')
      } else {
        this.props.addToGuestCart(this.props.product.id)
      }
    }
  }

  render() {
    return (
      <div>
        <button
          type="button"
          id="add-to-cart"
          onClick={() => this.handleClick()}
        >
          {' '}
          Add To Cart{' '}
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.id,
    isLoggedIn: !!state.user.id,
    userCart: state.singleCart.cart,
    guestCart: state.guestCart.guestCart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (userId, productId) =>
      dispatch(addToCartThunk(userId, productId)),
    addToGuestCart: productId => dispatch(addToGuestCartThunk(productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToCartButton)
