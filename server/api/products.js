const router = require('express').Router()
const {Product} = require('../db/models')

// SECURITY CONCERNS:  Add attributes so that we're only sending back "need to know" information
router.get('/', async (req, res, next) => {
  try {
    // can use attribute here to just send the information of all products we want to send
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// SECURITY CONCERNS:  Add attributes so that we're only sending back "need to know" information
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    res.json(product)
  } catch (err) {
    next(err)
  }
})
module.exports = router
