import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  GuestCart,
  Login,
  Signup,
  UserHome,
  allProducts,
  AllUsers,
  singleProduct,
  FullCart,
  SubmitOrder,
  SingleProductEdit
} from './components'

import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    const isAdmin = isLoggedIn ? this.props.isAdmin : false

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/products/:productId" component={singleProduct} />
        <Route exact path="/products" component={allProducts} />

        {/* This route only works if your userId matches the route params id */}
        <Route
          exact
          path="/users/:id/cart"
          render={({match}) => {
            if (parseInt(match.params.id) === this.props.userId) {
              return <FullCart id={match.params.id} />
            } else if (match.params.id === 'undefined') {
              console.log('inside CORRECT BRANCH')
              return <GuestCart id={match.params.id} />
            } else {
              return <Redirect to="/" />
            }
          }}
        />
        <Route exact path="/" component={allProducts} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            {/* This route checks if the user is an admin, and if not, redirects to the store */}
            <Route
              path="/users"
              render={() => {
                if (isAdmin) return <AllUsers />
                return <Redirect to="/" />
              }}
            />
            <Route
              exact
              path="/products/:productId/edit"
              component={SingleProductEdit}
            />
            <Route exact path="/submitOrder" component={SubmitOrder} />
          </Switch>
        )}
        {/* Displays allProducts component as a fallback */}
        <Route component={allProducts} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.admin,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
