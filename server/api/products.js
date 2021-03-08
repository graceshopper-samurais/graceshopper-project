const router = require('express').Router()
const {Product} = require('../db/models')
const {isAdmin} = require('./gatekeepers')

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

router.delete('/:id', isAdmin, async (req, res, next) => {
  try {
    await Product.destroy({where: {id: req.params.id}})
    res.status(204).send()
  } catch (err) {
    next(err)
  }
})

// PUT /api/products/:id
router.put('/:id', async (req, res, next) => {
  try {
    // console.log('req.body-------', req.body)
    // console.log('req.params-------', req.params)
    const {name, description, price} = req.body
    //find candle to update
    const candle = await Product.findByPk(req.params.id)
    //update info
    candle.name = name
    candle.description = description
    candle.price = price
    await candle.save()
    res.json(candle)
  } catch (err) {
    next(err)
  }
})

module.exports = router
