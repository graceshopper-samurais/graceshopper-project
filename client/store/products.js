import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'

/**
 * INITIAL STATE
 */
const defaultProducts = {
  products: [],
  loading: true
}

/**
 * ACTION CREATORS
 */
const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})

/**
 * THUNK CREATORS
 */
export const getProductsThunk = () => async dispatch => {
  try {
    const {response} = await axios.get('/api/products')
    dispatch(getProducts(response.data))
  } catch (error) {
    console.log('error in getProdThunk————', error)
  }
}

/**
 * REDUCER
 */

export default function(state = defaultProducts, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.products,
        loading: false
      }
    default:
      return state
  }
}
