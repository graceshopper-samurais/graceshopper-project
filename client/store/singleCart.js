import axios from 'axios'

//action types
const GET_CART = 'GET_CART'
// const GET_GUEST_CART = 'GET_GUEST_CART'
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

// const getGuestCart = () => {
//   return {
//     type: GET_GUEST_CART,
//   }
// }

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

// if user is logged in, we'll make it into our try, if user is guest, we'll hop into the catch
export const addToCartThunk = (userId, productId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.post(`/api/users/${userId}/cart`, {
        productId: productId,
      })
      dispatch(addToCart(data))
    } catch (err) {
      console.log('error in addToCartThunk thunk---', err)
    }
  }
}

// const alreadyInCartIdx = state.cart
//   .map((item) => item.id)
//   .indexOf(action.product.id)

export const addToGuestCartThunk = (productId) => {
  return async (dispatch) => {
    try {
      let {data} = await axios.get(`/api/products/${productId}`) //this is an obj
      data.quantity = 1
      let guestCart = JSON.parse(localStorage.getItem('cart'))
      if (!guestCart) {
        console.log('guest cart if it doesnt exist yet:', guestCart)
        // if there is no cart in localstorage yet, set cart to the candle we just added inside of an array
        let candle = [data]
        localStorage.setItem('cart', JSON.stringify(candle))
        dispatch(addToGuestCart(data))
      } else {
        // else cart has already been started
        console.log('guest cart if it DOES EXIST :', guestCart)
        const alrdyInLocalStorageIdx = guestCart
          .map((item) => item.id)
          .indexOf(productId)
        //if use adds a new item to cart (that is NOT a duplicate), push item onto our car array
        if (alrdyInLocalStorageIdx < 0) {
          guestCart.push(data)
          localStorage.setItem('cart', JSON.stringify(guestCart))
          dispatch(addToGuestCart(data))
        } else {
          guestCart[alrdyInLocalStorageIdx].quantity++
          localStorage.setItem('cart', JSON.stringify(guestCart))
          dispatch(addToGuestCart(data))
        }
      }
    } catch (err) {
      console.log('err in addToGuestCartThunk-----', err)
    }
  }
}

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
  // guestCart: [],
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
    // case GET_GUEST_CART:
    //   return {...state}
    case ADD_TO_CART: {
      // Check to see if already in cart
      console.log('state from logged in cart--->', state)
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
      console.log('current state-----', state)

      const alreadyInCartIdx = state.cart
        .map((item) => item.id)
        .indexOf(action.product.id)

      console.log(alreadyInCartIdx, 'is it alrdy in cart??')

      if (alreadyInCartIdx >= 0) {
        const newCart = state.cart
        newCart[alreadyInCartIdx].quantity++
        return {...state, cart: newCart}
      }
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
