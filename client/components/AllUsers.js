// NOTE: This component will be accessible ONLY to Admin(s)
import React from 'react'
import {connect} from 'react-redux'
import {fetchAllUsers} from '../store/allUsers'

class AllUsers extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.fetchAllUsers()
  }

  render() {
    const users = this.props.users
    return (
      <div id="all-users-view">
        <table id="all-users-table">
          <tr id="column-names-row">
            <th scope="col"> User ID </th>
            <th scope="col"> Name </th>
            <th scope="col"> Email Address </th>
            {/* would an Admin have access to users' passwords? */}
            <th scope="col"> Street Address </th>
            <th scope="col"> City </th>
            <th scope="col"> State </th>
            <th scope="col"> Zip Code </th>
            <th scope="col"> Admin Privileges </th>
          </tr>
          {/* map through each user and output a row for each one */}
          {users.map(user => (
            <React.Fragment key={user.id}>
              <tr id="single-user-row">
                <th scope="row"> {user.id} </th>
                <td> {user.name} </td>
                <td> {user.email} </td>
                <td> {user.address} </td>
                <td> {user.city} </td>
                <td> {user.state} </td>
                <td> {user.zip} </td>
                <td> {user.admin} </td>
              </tr>
            </React.Fragment>
          ))}
        </table>
      </div>
    )
  }
}

const mapState = state => {
  return {
    users: state.allUsers.users
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllUsers: () => dispatch(fetchAllUsers())
  }
}

export default connect(mapState, mapDispatch)(AllUsers)
