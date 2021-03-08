import React from 'react'
import {connect} from 'react-redux'
import {getProductsThunk, removeProductThunk} from '../store/products'
import {addToCartThunk} from '../store/singleCart'
import {addToGuestCartThunk} from '../store/guestCart'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const products = this.props.products
    const {isLoggedIn} = this.props
    const isAdmin = isLoggedIn ? this.props.isAdmin : false
    if (this.props.loading) {
      return (
        <div id="products-loader">
          <Loader
            type="Watch"
            color="#7fdeff"
            secondaryColor="#dabfff"
            height={300}
            width={300}
          />
          <div> Candles loading . . . </div>
        </div>
      )
    }
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
                    {isAdmin && (
                      <button
                        type="button"
                        id="delete-product"
                        onClick={() => {
                          this.props.removeProduct(product.id)
                        }}
                      >
                        {' '}
                        Remove From Storefront{' '}
                      </button>
                    )}
                  </div>
                </div>
              )
            })
          ) : (
            <p> All Sold Out! </p>
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
    userId: state.user.id,
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.admin
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(getProductsThunk()),
    addToCart: (userId, productId) =>
      dispatch(addToCartThunk(userId, productId)),
    addToGuestCart: productId => dispatch(addToGuestCartThunk(productId)),
    removeProduct: productId => dispatch(removeProductThunk(productId))
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
