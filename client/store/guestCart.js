import axios from 'axios'

//action types
const GET_GUEST_CART = 'GET_GUEST_CART'
const ADD_TO_GUEST_CART = 'ADD_TO_GUEST_CART'
const UPDATE_CART = 'UPDATE_CART'
const DELETE_FROM_GUEST_CART = 'DELETE_FROM_GUEST_CART'
const CLEAR_GUEST_CART = 'CLEAR_GUEST_CART' // would like to add this functionality somehwere (after someone logs in, we should clear localStorage guest cart). Later tiers, if someone logs in, these items could be transferred to their loggedIn cart.

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

const updateCart = product => {
  return {
    type: UPDATE_CART,
    product
  }
}

const deleteFromGuestCart = productId => {
  return {
    type: DELETE_FROM_GUEST_CART,
    productId
  }
}

//thunk creators

export const fetchGuestCart = () => {
  return dispatch => {
    try {
      console.log('made it to fetch guest cart thunk???')
      let localCart = JSON.parse(localStorage.getItem('guestCart'))
      console.log(
        'this is localStorage cart from fetch guest cart thunk------',
        localCart
      )
      dispatch(getGuestCart(localCart))
    } catch (err) {
      console.log('error in fetchGuestCart thunk---', err)
    }
  }
}

export const addToGuestCartThunk = productId => {
  return async dispatch => {
    try {
      let {data} = await axios.get(`/api/products/${productId}`)
      data.quantity = 1 //give candle a default quantity property
      let guestCart = JSON.parse(localStorage.getItem('guestCart'))
      // if there is no cart in localstorage yet, set cart equal to an array with our candle selection
      if (!guestCart) {
        let candle = [data]
        localStorage.setItem('guestCart', JSON.stringify(candle))
        dispatch(addToGuestCart(data))
      } else {
        // else cart has already been started
        const alrdyInLocalStorageIdx = guestCart
          .map(item => item.id)
          .indexOf(productId)
        //if user adds a new item to cart (that is NOT a duplicate), push item onto our cart array
        if (alrdyInLocalStorageIdx < 0) {
          guestCart.push(data)
          localStorage.setItem('guestCart', JSON.stringify(guestCart))
          dispatch(addToGuestCart(data))
        } else {
          // else that specific item already in cart, so just update qty
          guestCart[alrdyInLocalStorageIdx].quantity++
          localStorage.setItem('guestCart', JSON.stringify(guestCart))
          dispatch(addToGuestCart(data))
        }
      }
    } catch (err) {
      console.log('err in addToGuestCartThunk-----', err)
    }
  }
}
//have not udpate this!
export const updateCartThunk = (userId, productId, quantity) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`api/users/${userId}/cart`, {
        productId: productId,
        quantity: quantity
      })
      dispatch(updateCart(data))
    } catch (err) {
      console.log('error in updateCartThunk-----', err)
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
  localStorage.removeItem('guestCart')
}

//initial state

const initialState = {
  guestCart: [],
  noCart: true
}

// reducer

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_GUEST_CART:
      return {
        ...state,
        guestCart: action.guestCart,
        noCart: false
      }
    case ADD_TO_GUEST_CART: {
      const alreadyInCartIdx = state.guestCart
        .map(item => item.id)
        .indexOf(action.product.id)

      if (alreadyInCartIdx >= 0) {
        const newCart = state.guestCart
        newCart[alreadyInCartIdx].quantity++
        return {...state, guestCart: newCart}
      }
      return {...state, guestCart: [...state.guestCart, action.product]}
    }
    case UPDATE_CART: {
      const filteredArray = [...state.guestCart].filter(
        item => item.id !== action.productOrderId
      )
      return {...state, guestCart: [filteredArray, action.productOrderId]}
    }
    case DELETE_FROM_GUEST_CART: {
      return {
        ...state,
        guestCart: state.guestCart.filter(
          lineItem => lineItem.id !== action.productId
        )
      }
    }

    default:
      return state
  }
}
