import React from 'react'
import {connect} from 'react-redux'
import {submitOrderThunk} from '../store/singleCart'

const SubmitOrderButton = (props) => {
  return (
    <>
      <button
        type="button"
        onClick={() => props.submitOrder(props.userId, props.orderId)}
      >
        Submit Order
      </button>
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitOrder: (userId, orderId) =>
      dispatch(submitOrderThunk(userId, orderId)),
  }
}

export default connect(null, mapDispatchToProps)(SubmitOrderButton)
