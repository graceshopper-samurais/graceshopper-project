/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AllUsers} from './AllUsers'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AllUsers', () => {
  let allUsers

  beforeEach(() => {
    // currently unsure what to put here for AllUsers; I tried using the user-home example but it does not work the same way
  })

  it('renders all users in a table', () => {
    // TBD
  })

  it('is only viewable by an Admin user', () => {})

  it('does NOT retrieve nor render any passwords', () => {})
})
