import React from 'react'
import {connect} from 'react-redux'
import {deleteFromCartThunk} from '../store/singleCart'
import {deleteFromGuestCartThunk} from '../store/guestCart'

const DeleteButton = (props) => {
  return (
    <>
      <button
        className="cart__button"
        type="button"
        onClick={
          props.isLoggedIn
            ? () => props.delete(props.userId, props.productOrderId)
            : () => props.deletefromGuestCart(props.productId)
        }
      >
        Delete
      </button>
    </>
  )
}


const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    delete: (userId, productOrderId) =>
      dispatch(deleteFromCartThunk(userId, productOrderId)),
    deletefromGuestCart: (productId) =>
      dispatch(deleteFromGuestCartThunk(productId)),
  }
}

export default connect(mapState, mapDispatchToProps)(DeleteButton)
