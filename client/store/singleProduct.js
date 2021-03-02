import axios from 'axios'

//ACTION TYPES
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const ADD_TO_CART = 'ADD_TO_CART'

//ACTION CREATORS:
export const _getSingleProduct = product => {
  return {
    type: GET_SINGLE_PRODUCT,
    product
  }
}

//does this need to be singleProduct or productId as an arg?
export const _addToCart = product => {
  return {
    type: ADD_TO_CART,
    product
  }
}

//THUNKS
export const getSingleProduct = productId => {
  return async dispatch => {
    try {
      const product = (await axios.get(`/api/products/${productId}`)).data
      dispatch(_getSingleProduct(product))
    } catch (err) {
      console.log(err)
    }
  }
}

//this is tied to the singleProduct component, but should it be?
export const addToCart = productId => {
  return async dispatch => {
    try {
      //what should this thunk do? create an item in the Cart table? should
      //this even be in this file or in a Cart reducer file?
    } catch (err) {
      console.log(err)
    }
  }
}

export default function(state = {}, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}
