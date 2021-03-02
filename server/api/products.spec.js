/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Products routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    const productName = 'Midnight Flame'
    const price = 10

    beforeEach(() => {
      return Product.create({
        name: productName,
        price: price
      })
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(productName)
      expect(res.body[0].price).to.be.equal(price)
    })
  }) // End describe /api/products
}) // End describe 'products routes'
