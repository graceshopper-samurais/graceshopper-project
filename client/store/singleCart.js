import axios from 'axios'

//action types
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'

const ADD_TO_GUEST_CART = 'ADD_TO_GUEST_CART'

const UPDATE_CART = 'UPDATE_CART'

// action creators

const DELETE_FROM_CART = 'DELETE_FROM_CART'

// action creators

const getCart = (cart) => {
  return {
    type: GET_CART,
    cart,
  }
}

const addToCart = (productOrder) => {
  return {
    type: ADD_TO_CART,
    productOrder,
  }
}

const addToGuestCart = (product) => {
  return {
    type: ADD_TO_GUEST_CART,
    product,
  }
}

const updateCart = (product) => {
  return {
    type: UPDATE_CART,
    product,
  }
}

const deleteFromCart = (productOrderId) => {
  return {
    type: DELETE_FROM_CART,
    productOrderId,
  }
}

//thunk creators

export const fetchCart = (id) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/users/${id}/cart`)
      dispatch(getCart(data))
    } catch (err) {
      let localCart = JSON.parse(localStorage.getItem('cart'))
      console.log('this is localStorage cart from thunk------', localCart)
      dispatch(getCart(localCart))
      console.log('error in fetchCartThunk----', err)
    }
  }
}

export const fetchGuestCart = () => {
  return (dispatch) => {
    try {
      let localCart = JSON.parse(localStorage.getItem('cart'))
      console.log('this is localStorage cart from thunk------', localCart)
      dispatch(getCart(localCart))
    } catch (err) {
      console.log('error in fetchGuestCart thunk---', err)
    }
  }
}

export const addToCartThunk = (userId, productId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.post(`/api/users/${userId}/cart`, {
        productId: productId,
      })
      dispatch(addToCart(data))
    } catch (err) {
      let {data} = await axios.get(`/api/products/${productId}`) //this is an obj
      let candle = [data]
      // console.log(data, '<----this is candle')
      let guestData = JSON.parse(localStorage.getItem('cart')) // this is an array
      // let arrayData = [guestData]
      if (!guestData) {
        localStorage.setItem('cart', JSON.stringify(candle))
        dispatch(addToGuestCart(data))
        // console.log('cart does not exist!')
      } else {
        guestData.push(data)
        localStorage.setItem('cart', JSON.stringify(guestData))

        dispatch(addToGuestCart(data))
      }

      console.log('this is array data-----', guestData)
      // console.log('this is backend data----', data)
      console.log('this is localStorage----', localStorage)
      console.log('error in addToCartThunk————', err)
    }
  }
}

// export const addToGuestCartThunk = (productId) => {
//   return async (dispatch) => {
//     try {
//       let guestData = JSON.parse(localStorage.getItem('cart'))
//       const {data} = await axios.get(`/api/products/${productId}`)
//       console.log('this is guest data-----', guestData)
//       console.log('this is backend data----', data)
//     } catch (err) {
//       console.log('error in addToGuestCartThunk', err)
//     }
//   }
// }

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
  return async (dispatch) => {
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
  guestCart: [],
  noCart: true,
}

// reducer

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      // return action.cart
      return {
        ...state,
        cart: action.cart,
        noCart: false,
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
    case ADD_TO_GUEST_CART: {
      let index = state.cart.findIndex(
        (candle) => candle.id === action.product.id
      )
      // console.log('this is index----------', index)

      // if (index === -1) {
      //   // let arts = [...state.cart.arts, action.art]
      //   // let cart = {...state.cart, arts}
      //   // return {...state, cart}
      //   // console.log()
      // }
      // return {...state, cart: }
      console.log('this is state------', state)
      console.log('this is new state!!!', [...state.cart, action.product])
      return {...state, cart: [...state.cart, action.product]}
    }
    case UPDATE_CART: {
      const filteredArray = [...state.cart].filter(
        (item) => item.id !== action.productOrderId
      )
      return {...state, cart: [filteredArray, action.productOrderId]}
    }
    case DELETE_FROM_CART: {
      return {
        ...state,
        cart: state.cart.filter(
          (lineItem) => lineItem.id !== action.productOrderId
        ),
      }
    }
    default:
      return state
  }
}
