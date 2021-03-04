import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import CartIcon from './CartIcon'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <div id="title-container">
      <h1 id="site-title">BOUTIQUE CANDLES</h1>
    </div>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/">Store</Link>
          <Link to="/home">Profile</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <CartIcon />
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/">Store</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <div>
            <CartIcon />
          </div>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
