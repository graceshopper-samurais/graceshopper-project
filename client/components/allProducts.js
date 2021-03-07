import React from 'react'
import {connect} from 'react-redux'
import {getProductsThunk} from '../store/products'
import {addToCartThunk} from '../store/singleCart'
import {Link} from 'react-router-dom'

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  // compnentWillUnmount: when component unmounts, we want tochange loading back to true

  render() {
    const products = this.props.products
    return (
      <div className="products">
        <div className="products__items">
          {products.length ? (
            products.map(product => {
              return (
                <div className="products__item" key={product.id}>
                  <img src={product.imageUrl} alt="Sample Candle" />
                  <div id="product-name-price-container">
                    <div id="product-name-container">
                      <Link to={`/products/${product.id}`}>
                        <span>{product.name}</span>
                      </Link>
                    </div>
                    <div id="product-price-container">
                      <span>{product.price}</span>
                    </div>
                    <button
                      type="button"
                      id="add-to-cart"
                      onClick={() =>
                        this.props.addToCart(this.props.userId, product.id)
                      }
                    >
                      {' '}
                      Add To Cart{' '}
                    </button>
                    <button type="button" id="delete-product">
                      {' '}
                      Remove From Storefront{' '}
                    </button>
                  </div>
                </div>
              )
            })
          ) : (
            <p>Candles Loading...</p>
          )}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products.products,
    loading: state.products.loading,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(getProductsThunk()),
    addToCart: (userId, productId) =>
      dispatch(addToCartThunk(userId, productId))
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
