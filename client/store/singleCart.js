import axios from 'axios'
import {gotCart} from './cartIcon'
import {clearGuestCartThunk} from './guestCart'

//action types
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const UPDATE_CART = 'UPDATE_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'
const SUBMIT_ORDER = 'SUBMIT_ORDER'
const MERGE_CART = 'MERGE_CART'

// action creators

const getCart = cart => {
  return {
    type: GET_CART,
    cart
  }
}

const addToCart = productOrder => {
  return {
    type: ADD_TO_CART,
    productOrder
  }
}

const updateCart = productOrder => {
  return {
    type: UPDATE_CART,
    productOrder
  }
}

const deleteFromCart = productOrderId => {
  return {
    type: DELETE_FROM_CART,
    productOrderId
  }
}

const submitOrder = order => {
  return {
    type: SUBMIT_ORDER,
    order
  }
}

//thunk creators

export const fetchCart = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${id}/cart`)
      // console.log('data from fetchCart thunk--->>>', data)
      dispatch(getCart(data))
      dispatch(gotCart())
    } catch (err) {
      console.log('error in fetchCartThunk----', err)
    }
  }
}

// if user is logged in, we'll make it into our try, if user is guest, we'll hop into the catch
export const addToCartThunk = (userId, productId) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/users/${userId}/cart`, {
        productId: productId
      })
      dispatch(addToCart(data))
    } catch (err) {
      console.log('error in addToCartThunk thunk---', err)
    }
  }
}

export const updateCartThunk = (userId, productId, quantity) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/users/${userId}/cart`, {
        productId: productId,
        quantity: quantity
      })
      console.log('this is data and data.product-----', data, data.product)
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

export const submitOrderThunk = (userId, orderId) => {
  return async dispatch => {
    try {
      console.log(`submitOrderThunk called with ${userId} ${orderId}`)
      const {data} = await axios.put(`/api/users/${userId}/order/${orderId}`, {
        isFulfilled: true
      })
      console.log(`submitOrderThunk returned ${data}`)
      dispatch(submitOrder(data))
    } catch (err) {
      console.log('error in the submitOrderThunk————', err)
    }
  }
}

export const mergeCartThunk = userId => {
  return async dispatch => {
    try {
      let localCart = JSON.parse(localStorage.getItem('guestCart'))

      console.log('localCart————————', localCart)

      if (localCart && localCart.length) {
        console.log('in CORRECT BRACKET')
        localCart = {
          localCart
        }

        const {data} = await axios.put(
          `/api/users/${userId}/cart/merge`,
          localCart
        )
        console.log('DATA BACK FROM API IN MERGECART————', data)
        dispatch(getCart(data))

        dispatch(clearGuestCartThunk())
      }
    } catch (err) {
      console.log('error in mergeCartThunk—————', err)
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
    case GET_CART: {
      const noCart = !action.cart.length

      return {
        ...state,
        cart: action.cart,
        noCart: noCart
      }
    }
    case ADD_TO_CART: {
      // Check to see if already in cart
      console.log('state from logged in cart--->', state)
      const alreadyInCart = state.cart
        .map(productOrder => productOrder.product.id)
        .includes(action.productOrder.product.id)
      // If so, replace only that productOrder with new productOrder
      if (alreadyInCart) {
        const newCart = state.cart.map(productOrder => {
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
      const newCart = state.cart.map(productOrder => {
        if (productOrder.product.id === action.productOrder.product.id) {
          return action.productOrder
        } else {
          return productOrder
        }
      })
      return {...state, cart: newCart}
    }
    case DELETE_FROM_CART: {
      return {
        ...state,
        cart: state.cart.filter(
          lineItem => lineItem.id !== action.productOrderId
        )
      }
    }
    case SUBMIT_ORDER: {
      return initialState
    }
    default:
      return state
  }
}
