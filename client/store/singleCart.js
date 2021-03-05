import axios from 'axios'

//action types
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'

const UPDATE_CART = 'UPDATE_CART'

// action creators


const DELETE_FROM_CART = 'DELETE_FROM_CART'

// action creators

const getCart = cart => {
  return {
    type: GET_CART,
    cart
  }
}

const addToCart = product => {
  return {
    type: ADD_TO_CART,
    product
  }
}

const updateCart = product => {
  return {
    type: UPDATE_CART,
    product
  }
}

const deleteFromCart = productOrderId => {
  return {
    type: DELETE_FROM_CART,
    productOrderId
  }
}



//thunk creators

export const fetchCart = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${id}/cart`)
      dispatch(getCart(data))
    } catch (err) {
      console.log('error in fetchCartThunk----', err)
    }
  }
}

export const addToCartThunk = (userId, productId) => {
  return async dispatch => {
    try {

      const {data} = await axios.post(`/api/users/${userId}/cart`, {
        productId: productId,
      })

      dispatch(addToCart(data))
    } catch (err) {
      console.log('error in addToCartThunk————', err)
    }
  }
}


export const updateCartThunk = (userId, productId) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`api/users/${userId}/cart`, productId)
      dispatch(updateCart(data))
    } catch (err) {
      console.log('error in updateCartThunk-----', err)

//technically, the userId isn't needed to delete a productOrder, but
// including it in the API Url for consistency
export const deleteFromCartThunk = (userId, productOrderId) => {
  return async dispatch => {
    try {
      await axios.delete(`/api/users/${userId}/cart/${productOrderId}`)
      dispatch(deleteFromCart(productOrderId))
    } catch (err) {
      console.log('error in deleteFromCartThunk————', err)

    }
  }
}

//initial state

const initialState = {
  cart: [],
  noCart: true
}

// reducer

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      // return action.cart
      return {
        ...state,
        cart: action.cart,
        noCart: false
      }
    case ADD_TO_CART: {
      const alreadyInCart = state
        .map(product => product.id)
        .includes(action.product.id)

      if (alreadyInCart) {
        const newCart = state.map(product => {
          if (product.id === action.product.id) {
            return action.product.id
          } else {
            return product.id
          }
        })
        return newCart
      } else {
        return [...state, action.product]
      }
    }

    case UPDATE_CART: {
      // What would go here? I tried using what I did for updateCampus in JPFP to no avail. We might need to adjust our initialState - Kendall
      return state
    }
    case DELETE_FROM_CART: {
      return state.filter(lineItem => lineItem.id !== action.productOrderId)

    }
    default:
      return state
  }
}
