const router = require('express').Router()
const {User, Cart, Product} = require('../db/models')
module.exports = router

// GET /api/users/:id/cart
// router.get('/:id', async (req, res, next) => {
//   try {
//     const userCart = await Cart.findAll({
//       where:
//     })
//     res.json(singleUser)
//   } catch (err) {
//     next(err)
//   }
// })
