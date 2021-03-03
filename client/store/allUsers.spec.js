/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {fetchAllUsers} from './allUsers'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {users: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchAllUsers', () => {
    it('eventually dispatches the GET USER action', async () => {
      const fakeUsers = [{name: 'Vetra Nyx'}, {name: 'Liam Kosta'}]
      mockAxios.onGet('/api/users').replyOnce(200, fakeUsers)
      await store.dispatch(fetchAllUsers())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_ALL_USERS')
      expect(actions[0].users).to.be.deep.equal(fakeUsers)
    })
  })
})
