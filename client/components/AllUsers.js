// NOTE: This component will be accessible ONLY to Admin(s)
import React from 'react'
import {connect} from 'react-redux'
import {fetchAllUsers} from '../store/allUsers'

export class AllUsers extends React.Component {
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
        <table id="all-users-table" cellSpacing="20">
          <tbody>
            <tr id="column-names-row">
              <th scope="col"> USER ID </th>
              <th scope="col"> NAME</th>
              <th scope="col"> EMAIL ADDRESS </th>
              {/* would an Admin have access to users' passwords? */}
              <th scope="col"> STREET ADDRESS </th>
              <th scope="col"> CITY </th>
              <th scope="col"> STATE </th>
              <th scope="col"> ZIP CODE </th>
              <th scope="col"> ADMIN </th>
            </tr>
            {/* map through each user and output a row for each one */}
            {users.map((user) => (
              <React.Fragment key={user.id}>
                <tr id="single-user-row">
                  <th scope="row"> {user.id} </th>
                  <td> {user.name} </td>
                  <td> {user.email} </td>
                  <td> {user.address} </td>
                  <td> {user.city} </td>
                  <td> {user.state} </td>
                  <td> {user.zip} </td>
                  <td> {String(user.admin)} </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    users: state.allUsers.users,
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchAllUsers: () => dispatch(fetchAllUsers()),
  }
}

export default connect(mapState, mapDispatch)(AllUsers)
