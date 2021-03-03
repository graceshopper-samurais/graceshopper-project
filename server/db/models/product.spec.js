/* global describe beforeEach it */

// uncomment this out:
const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('name field', () => {
    let candle1
    beforeEach(async () => {
      candle1 = await Product.create({
        name: 'Summer Breeze'
      })
    })
    it('name is a string', () => {
      expect(candle1.name).to.equal('Summer Breeze')
    })

    it('name cannot be null', async () => {
      await expect(
        Product.create({}),
        "We shouldn't be able to create a user with no name"
      ).to.be.rejected
    })
  })
  describe('description field', () => {
    let candle2
    beforeEach(async () => {
      candle2 = await Product.create({
        name: 'Summer Breeze'
      })
    })
    it('name is a string', () => {
      expect(candle2.description).to.equal(false)
    })
  })
})
