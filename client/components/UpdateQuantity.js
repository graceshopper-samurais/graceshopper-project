import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateCartThunk} from '../store/singleCart'

class UpdateQuantity extends Component {
  constructor(props) {
    super(props)
    this.state = {quantity: 1}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }

  async handleSubmit(evt) {
    evt.preventDefault()
  }

  render() {
    return (
      <div>
        <div> Quantity: </div>
        <form id="quantity-form" onSubmit={this.handleSubmit}>
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    update: (userId, productId, quantity) =>
      dispatch(updateCartThunk(userId, productId, quantity)),
  }
}

export default connect(null, mapDispatchToProps)(UpdateQuantity)
