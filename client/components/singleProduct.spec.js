import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {singleProduct} from './singleProduct'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('singleProduct', () => {
  const products = [
    {
      name: 'Glitter Delight',
      description: 'Lorem ipsum dolor sit amet',
      imageUrl: '/images/candle-01.jpg',
      price: 5
    },
    {
      name: 'Lavender Fields',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: '/images/candle-02.jpg',
      price: 15
    }
  ]

  beforeEach(() => {
    mockAxios.onGet('/api/products/:productId').replyOnce(200, products)
  })

  it('renders the product passed in as props', () => {
    const wrapper = mount(
      <singleProduct products={products} getProduct={getStudentsProductSpy} />
    )
    expect(wrapper.text()).to.include('Glitter Delight')
  })
})
