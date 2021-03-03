/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AllUsers} from './AllUsers'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AllUsers', () => {
  const allUsers = [
    {
      id: 1,
      name: 'Tadius Ahern'
    },
    {
      id: 2,
      name: 'Urdnot Dagg'
    }
  ]

  beforeEach(() => {
    // referred to JPFP tests for campuses...might need to address this if we use two tests and unconnected components for tests; TBD
    mockAxios.onGet('/api/users').replyOnce(200, allUsers)
  })

  it('renders all users passed in as props', () => {
    // TBD
  })

  it('is only viewable by an Admin user', () => {})

  it('does NOT retrieve nor render any passwords', () => {})
})
