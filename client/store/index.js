import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import allUsersReducer from './allUsers'
import products from './products'
import singleProduct from './singleProduct'
import singleCart from './singleCart'
import guestCart from './guestCart'
import cartIcon from './cartIcon'
import orders from './orders'

const reducer = combineReducers({
  user,
  products,
  allUsers: allUsersReducer,
  singleProduct,
  singleCart,
  guestCart,
  cartIcon,
  orders
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
