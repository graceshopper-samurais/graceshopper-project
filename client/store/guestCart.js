import axios from 'axios'
import {gotCart} from './cartIcon'

//action types
const GET_GUEST_CART = 'GET_GUEST_CART'
const ADD_TO_GUEST_CART = 'ADD_TO_GUEST_CART'
const UPDATE_GUEST_CART = 'UPDATE_GUEST_CART'
const DELETE_FROM_GUEST_CART = 'DELETE_FROM_GUEST_CART'
const CLEAR_GUEST_CART = 'CLEAR_GUEST_CART' // would like to add this functionality somewhere (after someone logs in, we should clear localStorage guest cart). Later tiers, if someone logs in, these items could be transferred to their loggedIn cart.

// action creators
const getGuestCart = guestCart => {
  return {
    type: GET_GUEST_CART,
    guestCart
  }
}

const addToGuestCart = product => {
  return {
    type: ADD_TO_GUEST_CART,
    product
  }
}

const updateGuestCart = product => {
  return {
    type: UPDATE_GUEST_CART,
    product
  }
}

const deleteFromGuestCart = productId => {
  return {
    type: DELETE_FROM_GUEST_CART,
    productId
  }
}

export const clearGuestCart = () => {
  return {
    type: CLEAR_GUEST_CART
  }
}

//thunk creators

export const fetchGuestCart = () => {
  return dispatch => {
    try {
      let localCart = JSON.parse(localStorage.getItem('guestCart'))

      if (localCart) {
        dispatch(getGuestCart(localCart))
        dispatch(gotCart())
      } else {
        dispatch(getGuestCart([]))
        dispatch(gotCart())
      }
    } catch (err) {
      console.log('error in fetchGuestCart thunk---', err)
    }
  }
}

export const addToGuestCartThunk = productId => {
  return async dispatch => {
    try {
      let {data} = await axios.get(`/api/products/${productId}`)
      console.log('HELLO?')
      data.quantity = 1 //give candle a default quantity property
      let guestCart = JSON.parse(localStorage.getItem('guestCart'))
      // if there is no cart in localstorage yet, set cart equal to an array with our candle selection
      if (!guestCart) {
        console.log('NO GUEST CART')
        let candle = [data]
        localStorage.setItem('guestCart', JSON.stringify(candle))
        dispatch(addToGuestCart(data))
      } else {
        console.log('GUEST CART EXISTS')
        // else cart has already been started
        const alrdyInLocalStorageIdx = guestCart
          .map(item => item.id)
          .indexOf(productId)
        //if user adds a new item to cart (that is NOT a duplicate), push item onto our cart array
        if (alrdyInLocalStorageIdx < 0) {
          guestCart.push(data)
          localStorage.setItem('guestCart', JSON.stringify(guestCart))
          console.log('data in THUNK—————', data)
          dispatch(addToGuestCart(data))
        } else {
          // else that specific item already in cart, so just update qty
          guestCart[alrdyInLocalStorageIdx].quantity++
          localStorage.setItem('guestCart', JSON.stringify(guestCart))
          console.log('data in THUNK—————', data)
          dispatch(addToGuestCart(data))
        }
      }
    } catch (err) {
      console.log('err in addToGuestCartThunk-----', err)
    }
  }
}

export const updateGuestCartThunk = (productId, quantity) => {
  return dispatch => {
    try {
      const guestCart = JSON.parse(localStorage.getItem('guestCart'))

      const alreadyInLocalStorageIdx = guestCart
        .map(item => item.id)
        .indexOf(productId)

      guestCart[alreadyInLocalStorageIdx].quantity = quantity

      localStorage.setItem('guestCart', JSON.stringify(guestCart))

      console.log(
        'guestCart[alreadyInLocalStorageIdx] in updateGuestCartTHUNK—————',
        guestCart[alreadyInLocalStorageIdx]
      )

      dispatch(updateGuestCart(guestCart[alreadyInLocalStorageIdx]))
    } catch (err) {
      console.log('error in updateGuestCartThunk-----', err)
    }
  }
}

export const deleteFromGuestCartThunk = productId => {
  return dispatch => {
    try {
      let guestCart = JSON.parse(localStorage.getItem('guestCart'))
      guestCart = guestCart.filter(item => item.id !== productId)
      localStorage.setItem('guestCart', JSON.stringify(guestCart))
      dispatch(deleteFromGuestCart(productId))
    } catch (err) {
      console.log('error in deleteFromGuestCartThunk', err)
    }
  }
}

export const clearGuestCartThunk = () => {
  return dispatch => {
    try {
      localStorage.removeItem('guestCart')
      dispatch(clearGuestCart())
    } catch (err) {
      console.log('error in clearGuestCartThunk—————', err)
    }
  }
}

//initial state

const initialState = {
  guestCart: [],
  noCart: true
}

// reducer

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_GUEST_CART: {
      const noCart = !action.guestCart.length
      return {
        ...state,
        guestCart: action.guestCart,
        noCart: noCart,
        loading: false
      }
    }
    case ADD_TO_GUEST_CART: {
      const alreadyInCartIdx = state.guestCart
        .map(item => item.id)
        .indexOf(action.product.id)

      if (alreadyInCartIdx >= 0) {
        const newCart = [...state.guestCart]
        newCart[alreadyInCartIdx].quantity++
        return {...state, guestCart: newCart}
      }
      return {...state, guestCart: [...state.guestCart, action.product]}
    }
    case UPDATE_GUEST_CART: {
      const mappedArray = state.guestCart.map(item => {
        if (item.id !== action.product.id) {
          return item
        } else {
          return action.product
        }
      })
      return {...state, guestCart: mappedArray}
    }
    case DELETE_FROM_GUEST_CART: {
      return {
        ...state,
        guestCart: state.guestCart.filter(
          lineItem => lineItem.id !== action.productId
        )
      }
    }
    case CLEAR_GUEST_CART: {
      return initialState
    }

    default:
      return state
  }
}
