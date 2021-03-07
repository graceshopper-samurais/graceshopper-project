import React from 'react'
import {connect} from 'react-redux'
import {getProductsThunk} from '../store/products'
import {addToCartThunk} from '../store/singleCart'
import {addToGuestCartThunk} from '../store/guestCart'

import {Link} from 'react-router-dom'

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  // above return, if this.props.loading
  // then candles loading...
  // else load our candles

  // compnentWillUnmount: when component unmounts, we want tochange loading back to true

  render() {
    const products = this.props.products
    return (
      <div className="products">
        <div className="products__items">
          {products.length ? (
            products.map((product) => {
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
                      // if user is logged in add item to user cart, else add item to guest cart/local storage
                      onClick={
                        this.props.isLoggedIn
                          ? () =>
                              this.props.addToCart(
                                this.props.userId,
                                product.id
                              )
                          : () => this.props.addToGuestCart(product.id)
                      }
                    >
                      {' '}
                      Add To Cart{' '}
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

const mapState = (state) => {
  return {
    products: state.products.products,
    loading: state.products.loading,
    userId: state.user.id,
    isLoggedIn: !!state.user.id,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getProducts: () => dispatch(getProductsThunk()),
    addToCart: (userId, productId) =>
      dispatch(addToCartThunk(userId, productId)),
    addToGuestCart: (productId) => dispatch(addToGuestCartThunk(productId)),
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
