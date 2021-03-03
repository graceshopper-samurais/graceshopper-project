import axios from 'axios'

// ACTION TYPE
const GET_ALL_USERS = 'GET_ALL_USERS'

// ACTION CREATOR
const getAllUsers = users => {
  return {
    type: GET_ALL_USERS,
    users
  }
}

// THUNK CREATOR
export const fetchAllUsers = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/users')
      dispatch(getAllUsers(data))
    } catch (err) {
      console.log('error in fetchAllUsers thunk ------', err)
    }
  }
}

// INITIAL STATE
const initialState = {
  users: []
}

// REDUCER
export default function allUsersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return {...state, users: action.users}
    default:
      return state
  }
}
