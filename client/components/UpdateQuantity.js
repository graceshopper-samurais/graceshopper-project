import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateCartThunk} from '../store/singleCart'
import {updateGuestCartThunk} from '../store/guestCart'

class UpdateQuantity extends Component {
  constructor(props) {
    super(props)
    this.state = {quantity: this.props.quantity}
    this.handleChange = this.handleChange.bind(this)
  }

  async handleChange(evt) {
    await this.setState({
      quantity: evt.target.value
    })
    const quantity = parseInt(this.state.quantity)
    console.log('this is the state in handleChange-----', this.state)
    if (this.props.guest) {
      this.props.updateGuestCart(this.props.productId, quantity)
    } else {
      this.props.updateCart(this.props.userId, this.props.productId, quantity)
    }
  }

  render() {
    return (
      <div>
        <div> Quantity: </div>
        <form id="quantity-form">
          <select value={this.state.quantity} onChange={this.handleChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCart: (userId, productId, quantity) =>
      dispatch(updateCartThunk(userId, productId, quantity)),
    updateGuestCart: (productId, quantity) =>
      dispatch(updateGuestCartThunk(productId, quantity))
  }
}

export default connect(null, mapDispatchToProps)(UpdateQuantity)
