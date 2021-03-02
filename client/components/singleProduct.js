import React from 'react'
import {connect} from 'react-redux'
import {addToCart} from '../store/singleProduct'

const SingleProduct = props => {
  const {name, imageUrl, description, cost, id} = props

  return (
    <div>
      <h2>{name}</h2>
      <div>{imageUrl}</div>
      <div>{description}</div>
      <div>{cost}</div>
      <button onClick={() => props.addToCart(id)}>Add To Cart</button>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: id => dispatch(addToCart(id))
  }
}

export default connect(null, mapDispatchToProps)(SingleProduct)

//still need to wire up an "add to cart" btn to work properly, need to be sure that AllProducts component passes the singleProduct obj to this component, need to import my singleProduct file into Logan's AllProducts file for use
