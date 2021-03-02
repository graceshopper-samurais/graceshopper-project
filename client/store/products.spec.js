/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {getProductsThunk} from './products'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {products: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getProductsThunk', () => {
    it('eventually dispatches the GET USER action', async () => {
      const fakeProducts = [
        {name: 'Luscious Lavender'},
        {name: 'Scrumptious Smoke'}
      ]
      mockAxios.onGet('/api/products').replyOnce(200, fakeProducts)
      await store.dispatch(getProductsThunk())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_PRODUCTS')
      expect(actions[0].products).to.be.deep.equal(fakeProducts)
    })
  })
})
