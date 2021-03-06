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


const addToCart = (productOrder) => {
  return {
    type: ADD_TO_CART,
    productOrder,
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

export const updateCartThunk = (userId, productId, quantity) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.put(`api/users/${userId}/cart`, {
        productId: productId,
        quantity: quantity,
      })
      dispatch(updateCart(data))
    } catch (err) {
      console.log('error in updateCartThunk-----', err)
    }
  }
}

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
      // Check to see if already in cart
      const alreadyInCart = state.cart
        .map((productOrder) => productOrder.product.id)
        .includes(action.productOrder.product.id)

      // If so, replace only that productOrder with new productOrder
      if (alreadyInCart) {
        const newCart = state.cart.map((productOrder) => {
          if (productOrder.product.id === action.productOrder.product.id) {
            return action.productOrder
          } else {
            return productOrder
          }
        })
        return {...state, cart: newCart}

        // Else add new productOrder to end of array
      } else {
        return {...state, cart: [...state.cart, action.productOrder]}
      }
    }
    case UPDATE_CART: {
      const filteredArray = [...state.cart].filter(
        (item) => item.id !== action.productOrderId
      )
      return {...state, cart: [filteredArray, action.productOrderId]}
    }
    case DELETE_FROM_CART: {
      return state.cart.filter(
        (lineItem) => lineItem.id !== action.productOrderId
      )
    }
    default:
      return state
  }
}
