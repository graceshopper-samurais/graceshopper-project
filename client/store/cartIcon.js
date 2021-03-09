const GOT_CART = 'GOT_CART'

export const gotCart = () => ({
  type: GOT_CART
})

const intialState = {
  loading: true
}

export default function(state = intialState, action) {
  switch (action.type) {
    case GOT_CART:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}
