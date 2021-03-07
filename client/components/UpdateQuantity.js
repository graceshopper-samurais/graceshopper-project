import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateCartThunk} from '../store/singleCart'

class UpdateQuantity extends Component {
  constructor(props) {
    super(props)
    this.state = {quantity: this.props.quantity}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({
      quantity: evt.target.value,
    })
    console.log('this is the state in handleChange-----', this.state)
    this.props.updateCart(
      this.props.userId,
      this.props.productId,
      this.state.quantity
    )
  }

  async handleSubmit(evt) {
    evt.preventDefault()
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
          {/* <input type="submit" value="Submit" /> */}
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCart: (userId, productId, quantity) =>
      dispatch(updateCartThunk(userId, productId, quantity)),
  }
}

export default connect(null, mapDispatchToProps)(UpdateQuantity)
