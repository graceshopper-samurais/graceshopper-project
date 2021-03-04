const router = require('express').Router()
const {Cart, Product} = require('../db/models')
module.exports = router
// create a custom middleware called isUser that will check if the user is a User

// insert `isUser` after the string API route here
// GET /api/users/:id/cart
router.get('/:id/cart', async (req, res, next) => {
  try {
    const userCart = await Cart.findAll({
      where: {
        userId: req.params.id,
      },
      include: [Product],
    })
    res.json(userCart)
  } catch (err) {
    next(err)
  }
})
