import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addProductThunk} from '../store/products'

const initialState = {
  name: '',
  description: '',
  imageUrl: '/images/default.jpg',
  price: 0
}

class AddProduct extends Component {
  constructor() {
    super()

    this.state = {
      name: '',
      description: '',
      imageUrl: '/images/default.jpg',
      price: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.addProduct({...this.state})
    this.setState(initialState)
  }

  render() {
    return (
      <div>
        hello from the AddProduct component
        <form onSubmit={this.handleSubmit}>
          <h2>Add A Product:</h2>
          <label htmlFor="name">Product Name:</label>
          <input
            name="name"
            onChange={this.handleChange}
            value={this.state.name}
          />

          <label htmlFor="description">Description:</label>
          <input
            name="description"
            onChange={this.handleChange}
            value={this.state.description}
          />

          <label htmlFor="imageUrl">Image Url:</label>
          <input
            name="imageUrl"
            onChange={this.handleChange}
            value={this.state.imageUrl}
          />

          <label htmlFor="price">Price:</label>
          <input
            name="price"
            onChange={this.handleChange}
            value={this.state.price}
          />

          <button className="button" type="submit">
            Add Product
          </button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addProduct: product => dispatch(addProductThunk(product))
  }
}
export default connect(null, mapDispatchToProps)(AddProduct)
