import React from 'react'
import {connect} from 'react-redux'
import {deleteFromCartThunk} from '../store/singleCart'

const DeleteButton = (props) => {
  return (
    <>
      <button
        className="cart__button"
        type="button"
        onClick={() => props.delete(props.userId, props.productOrderId)}
      >
        Delete
      </button>
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    delete: (userId, productOrderId) =>
      dispatch(deleteFromCartThunk(userId, productOrderId)),
  }
}

export default connect(null, mapDispatchToProps)(DeleteButton)
