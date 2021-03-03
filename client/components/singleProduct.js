import React from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/singleProduct'
import AddToCartButton from './AddToCartButton'

export class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.productId)
  }

  render() {
    const product = this.props.singleProduct
    return (
      <div id="one-product" key={product.id}>
        <div id="product-image">
          <img src={product.imageUrl} />
        </div>
        <div id="product-name-price-container">
          <div id="product-name-container">
            <span>{product.name}</span>
          </div>
          <div id="product-price-container">
            <span>{product.price}</span>
          </div>
          <div>
            <AddToCartButton product={product} />
          </div>
        </div>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
