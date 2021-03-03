const router = require('express').Router()
const {Cart} = require('../db/models')
module.exports = router

// GET /api/users/:id/cart
router.get('/:id/cart', async (req, res, next) => {
  try {
    const userCart = await Cart.findAll({
      where: {
        userId: req.params.id
      },
      include: [Product]
    })
    res.json(userCart)
  } catch (err) {
    next(err)
  }
})
