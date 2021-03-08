import React from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/singleProduct'
import AddToCartButton from './AddToCartButton'

export class SingleProductEdit extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      price: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.productId)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
    console.log(this.state)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    console.log('submitting!', this.state)
  }

  render() {
    const product = this.props.singleProduct
    return (
      <div className="product-container">
        <form onSubmit={this.handleSubmit}>
          <div>
            <img src={product.imageUrl} />
          </div>
          <br />
          <div>
            <label htmlFor="name" />
            <input
              name="name"
              typeof="text"
              value={this.state.name}
              placeholder={product.name}
              onChange={this.handleChange}
            />
          </div>
          <br />
          <div>
            <textarea
              rows="6"
              cols="55"
              name="description"
              value={this.state.description}
              placeholder={product.description}
              onChange={this.handleChange}
            />
          </div>
          <br />
          <label htmlFor="name" />
          <input
            name="price"
            typeof="text"
            value={this.state.price}
            placeholder={product.price}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleProduct: state.singleProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleProduct: productId => dispatch(getSingleProduct(productId))
    // editProduct:
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProductEdit)

// export default SingleProductEdit
