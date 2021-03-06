import React from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/singleCart'
import DeleteButton from './DeleteButton'
import GuestCart from './GuestCart'

class FullCart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {value: 1}

    this.handleChange = this.handleChange.bind(this)
    // do we also need a handleSubmit in this case when there is no submit button after they select from the dropdown box?
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  componentDidMount() {
    this.props.getSingleCart(this.props.match.params.id)
  }

  // componentWillUnmount() {
  //   // No items currently in your cart. Happy shopping!
  //   this.props.noCart = true
  // }

  render() {
    const {cart} = this.props
    console.log('props from FULLCART: ', this.props)
   if (this.props.isLoggedIn) {
    if (this.props.noCart) {
      return <p>No items currently in your cart. Happy shopping!</p>
    } else {
      return (
        <div className="cart__cart-header">
          <div> You have {cart.length} items in your cart </div>
          {cart.map(item => {
            return (
              <div key={item.id}>
                <img
                  src={item.product.imageUrl}
                  className="cartImg"
                  alt={item.product.name}
                />
                <div> {item.product.name} </div>
                <div> Quantity: {item.quantity} </div>
                <select>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
                <div>
                  <DeleteButton
                    productOrderId={item.id}
                    userId={this.props.match.params.id}
                  />
                </div>
              </div>
            )
          })}
        </div>
      )
    } else {
      return <GuestCart />
    }
  }
}

const mapState = state => {
  return {
    cart: state.singleCart.cart,
    noCart: state.singleCart.noCart,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getSingleCart: id => dispatch(fetchCart(id))
  }
}

export default connect(mapState, mapDispatch)(FullCart)
