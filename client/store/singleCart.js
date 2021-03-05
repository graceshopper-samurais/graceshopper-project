import axios from 'axios'

//action types
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const UPDATE_CART = 'UPDATE_CART'

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
      // would this not be .post?
      const {data} = await axios.put(`/api/users/${userId}/cart`, productId)
      dispatch(addToCart(data))
    } catch (err) {
      console.log('error in addToCartThunk————', err)
    }
  }
}

// do we need to include `history` here? We're not going to a previous page, just updating the quantity, right?
export const updateCartThunk = (userId, productId) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`api/users/${userId}/cart`, productId)
      dispatch(updateCart(data))
    } catch (err) {
      console.log('error in updateCartThunk-----', err)
    }
  }
}

//initial state

const initialState = []

// reducer

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart
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
    default:
      return state
  }
}
