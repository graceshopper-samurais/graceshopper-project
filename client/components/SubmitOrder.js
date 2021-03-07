import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {submitOrderThunk} from '../store/singleCart'
import {Link} from 'react-router-dom'

const SubmitOrder = (props) => {
  useEffect(() => {
    props.submitOrder(props.location.userId, props.location.orderId)
  })

  return (
    <>
      Thank you for your business! Your order number is {props.location.orderId}{' '}
      and it will ship to the following address on the next business day:
      {props.user.name} {props.user.address} {props.user.city},{' '}
      {props.user.state}, {props.user.zip}
      {props.location.orderId}
      <Link to="/products">
        <button>OK</button>{' '}
      </Link>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitOrder: (userId, orderId) =>
      dispatch(submitOrderThunk(userId, orderId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitOrder)
