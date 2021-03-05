const router = require('express').Router()
const {User, Order, ProductOrder, Product} = require('../db/models')
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
router.get('/:id/cart', async (req, res, next) => {
  try {
    const userCart = await Order.findAll({
      where: {
        userId: req.params.id,
        isFulfilled: false
      },
      include: {
        model: ProductOrder,
        include: [Product]
      }
    })
    res.json(userCart.productorders)
  } catch (err) {
    next(err)
  }
})

// PUT /api/users/:id/cart
router.put('/:id/cart', async (req, res, next) => {
  try {
    // calling this oldProductId because the for updating, the items in question are already in the cart
    const oldProductId = req.body.productId
    const quantity = req.body.quantity
    const product = await Product.findByPk(oldProductId)
    const userCart = await Order.findOne({
      where: {
        userId: req.params.id,
        isFulFilled: false
      },
      // userId, productId, quantity
      include: [ProductOrder]
    })
    const productOrders = userCart.productorders
    const productOrder = productOrders.filter(
      order => order.productId === oldProductId
    )
    productOrder.quantity = quantity
    productOrder.subtotal = product.price * productOrder.quantity
    res.json(productOrder)
  } catch (err) {
    next(err)
  }
})
