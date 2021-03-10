import axios from 'axios'

//action types
const GET_ORDERS = 'GET_ORDERS'

// action creators
const getOrder = orders => {
  return {
    type: GET_ORDERS,
    orders
  }
}

//thunk creators

export const getOrderThunk = id => {
  return async dispatch => {
    try {
      console.log(id, '<-------id')
      const {data} = await axios.get(`/api/users/${id}/orderhistory`)
      console.log('data from getOrderThunk thunk--->>>', data)
      dispatch(getOrder(data))
    } catch (err) {
      console.log('error in getOrderThunk----', err)
    }
  }
}

//initial state

const initialState = {
  orders: []
}

// reducer

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS: {
      // const noCart = !action.cart.length

      return {
        ...state,
        orders: action.orders
      }
    }
    default:
      return state
  }
}
