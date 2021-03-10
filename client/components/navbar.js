import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import CartIcon from './CartIcon'

const Navbar = ({handleClick, isLoggedIn, isAdmin, userId}) => {
  const isAdminReally = isLoggedIn ? isAdmin : false
  return (
    <div>
      <div className="awning">
        <div className="candle">
          <div className="flame">
            <div className="shadows" />
            <div className="top" />
            <div className="middle" />
            <div className="bottom" />
          </div>
          <div className="wick" />
          <div className="wax" />
        </div>
        <div id="title-container">WICK BOTANICA</div>
        <div className="candle">
          <div className="flame">
            <div className="shadows" />
            <div className="top" />
            <div className="middle" />
            <div className="bottom" />
          </div>
          <div className="wick" />
          <div className="wax" />
        </div>
      </div>
      <nav>
        {isLoggedIn ? (
          <div className="nav-links">
            {/* The navbar will show these links after you log in */}
            {isAdminReally && <Link to="/users">Users</Link>}
            <Link to="/">Store</Link>
            <Link to="/home">Profile</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
            <Link to={`/users/${userId}/orderhistory`}>Order History</Link>

            <CartIcon />
          </div>
        ) : (
          <div className="nav-links">
            {/* The navbar will show these links before you log in */}
            <Link to="/">Store</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <CartIcon />
          </div>
        )}
      </nav>
      <hr />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.admin,
    userId: state.user.id
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
