import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {name === 'signup' ? (
          <div>
            <div>
              <label htmlFor="userName">
                <small>Name</small>
              </label>
              <input name="userName" type="text" />
            </div>
            <div>
              <label htmlFor="address">
                <small>Address</small>
              </label>
              <input name="address" type="text" />
            </div>
            <div>
              <label htmlFor="city">
                <small>City</small>
              </label>
              <input name="city" type="text" />
            </div>
            <div>
              <label htmlFor="state">
                <small>State</small>
              </label>
              <input name="state" type="text" />
            </div>
            <div>
              <label htmlFor="zip">
                <small>Zip</small>
              </label>
              <input name="zip" type="text" />
            </div>
          </div>
        ) : (
          <div />
        )}
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      {/* <a href="/auth/google">{displayName} with Google</a> */}
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const name = evt.target.userName ? evt.target.userName.value : null
      const address = evt.target.address ? evt.target.address.value : null
      const city = evt.target.city ? evt.target.city.value : null
      const state = evt.target.state ? evt.target.state.value : null
      const zip = evt.target.zip ? evt.target.zip.value : null
      dispatch(auth(email, password, formName, name, address, city, state, zip))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
