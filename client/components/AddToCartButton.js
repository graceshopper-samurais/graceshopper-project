import React from 'react'
import {connect} from 'react-redux'
import {addToCartThunk} from '../store/singleCart'

const AddToCartButton = ({product, userId, addToCart}) => {
  return (
    <div>
      <button
        type="button"
        id="add-to-cart"
        onClick={() => addToCart(userId, product.id)}
      >
        {' '}
        Add To Cart{' '}
      </button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (userId, productId) =>
      dispatch(addToCartThunk(userId, productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToCartButton)
