import React from 'react'
import {connect} from 'react-redux'
import {getOrderThunk} from '../store/orders'

class OrderHistory extends React.Component {
  componentDidMount() {
    this.props.getOrderHistory(this.props.userId)
  }
  render() {
    console.log('props from ORDER HISTORY++++++++++++', this.props)
    const {orders} = this.props
    return (
      <div>
        <table className="orderHistory_table">
          <tbody>
            <tr>
              <th>Date</th>
              <th>Order Number</th>
              <th>Subtotal</th>
            </tr>
            {orders.map(candle => {
              return (
                <tr key={candle.id}>
                  <td>{candle.createdAt}</td>
                  <td>{candle.orderId}</td>
                  <td>{candle.subtotal}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapState = state => {
  return {
    userId: state.user.id,
    orders: state.orders.orders
  }
}

const mapDispatch = dispatch => {
  return {
    getOrderHistory: userId => dispatch(getOrderThunk(userId))
  }
}

export default connect(mapState, mapDispatch)(OrderHistory)
