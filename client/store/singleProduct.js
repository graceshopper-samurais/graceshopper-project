import axios from 'axios'

//ACTION TYPES
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

//ACTION CREATORS:
export const _getSingleProduct = product => {
  return {
    type: GET_SINGLE_PRODUCT,
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

export default function(state = {}, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}
