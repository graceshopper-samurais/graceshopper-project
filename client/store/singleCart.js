import axios from 'axios'

//action types
const GET_CART = 'GET_CART'

// action creators

const getCart = cart => {
  return {
    type: GET_CART,
    cart
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

//initial state

const initialState = []

// reducer

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart
    default:
      return state
  }
}
