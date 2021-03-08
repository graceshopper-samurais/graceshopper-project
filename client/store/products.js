import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

/**
 * INITIAL STATE
 */
const defaultProducts = {
  products: [],
  product: {},
  loading: true
}

/**
 * ACTION CREATORS
 */
const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})

const deleteProduct = product => ({
  type: DELETE_PRODUCT,
  product
})

/**
 * THUNK CREATORS
 */
export const getProductsThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products')
    dispatch(getProducts(data))
  } catch (error) {
    console.log('error in getProdThunk————', error)
  }
}

export const removeProductThunk = id => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/products/${id}`)
    console.log('saying hello to katelyn from removeProductThunk')
    dispatch(deleteProduct(data))
  } catch (error) {
    console.log('error in removeProductThunk----', error)
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
    case DELETE_PRODUCT:
      return {}
    default:
      return state
  }
}
