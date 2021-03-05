const router = require('express').Router()
const {User, Order, ProductOrder} = require('../db/models')
module.exports = router

// GET /api/users
router.get('/', async (req, res, next) => {
  if (typeof req.user === 'undefined' || !req.user.admin) {
    const err = new Error('Access Denied')
    err.status = 403
    next(err)
  } else {
    try {
      const users = await User.findAll({
        // explicitly select only the id and email fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: ['id', 'email']
      })
      res.json(users)
    } catch (err) {
      next(err)
    }
  }
})

// GET /api/users/:id
router.get('/:id', async (req, res, next) => {
  try {
    // could check if req.params.id is a number and then send it in to protect against SQL injection attacks
    const singleUser = await User.findByPk(req.params.id)
    res.json(singleUser)
  } catch (err) {
    next(err)
  }
})

//CART ROUTES

// GET /api/users/:id/cart
// router.get('/:id/cart', async (req, res, next) => {
//   try {
//     const userCart = await Cart.findAll({
//       where: {
//         userId: req.params.id
//       },
//       include: [Product]
//     })
//     res.json(userCart)
//   } catch (err) {
//     next(err)
//   }
// })

// GET /api/users/:id/cart
router.get('/:id/cart', async (req, res, next) => {
  try {
    const userCart = await Order.findOne({
      where: {
        userId: req.params.id,
        isFulfilled: false // will this be boolean?
      },
      include: [ProductOrder]
    })
    res.json(userCart.productorders)
  } catch (err) {
    next(err)
  }
})

//This would be logical hierarchy for the route, but not using the UserId at this point
router.delete('/:id/cart/:line', async (req, res, next) => {
  try {
    await ProductOrder.destroy({where: {id: req.params.line}})
    res.status(204).send()
  } catch (err) {
    next(err)
  }
})
