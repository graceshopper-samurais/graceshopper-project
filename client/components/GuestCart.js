import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'

const GuestCart = () => {
  const [cart, setCart] = useState([])

  useEffect(
    () => {
      localStorage.setItem('cart', JSON.stringify(cart))
    },
    [cart]
  )

  return <div>you are a guest!</div>
}

export default GuestCart
