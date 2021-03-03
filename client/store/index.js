import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import allUsersReducer from './allUsers'
import products from './products'
import singleProduct from './singleProduct'

const reducer = combineReducers({
  user,
  products,
  allUsers: allUsersReducer,
  singleProduct
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
