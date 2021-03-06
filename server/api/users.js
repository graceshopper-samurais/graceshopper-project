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
        attributes: ['id', 'email'],
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
    const userCart = await Order.findOne({
      where: {
        userId: req.params.id,
        isFulfilled: false,
      },
      include: {
        model: ProductOrder,
        include: [Product],
      },
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

        isFulfilled: false,
      },
      // userId, productId, quantity
      include: {
        model: ProductOrder,

        include: [Product],
      },
    })
    const productOrders = userCart.productorders
    const productOrder = productOrders.filter(
      (order) => order.productId === oldProductId
    )
    // console.log to figure this shit out
    productOrder[0].quantity = quantity
    await productOrder[0].save()
    productOrder[0].subtotal = product.price * productOrder[0].quantity
    await productOrder[0].save()
    res.json(productOrder[0])
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

// POST cart route
router.post('/:id/cart', async (req, res, next) => {
  try {
    // Grab new product to add to cart
    const newProductId = req.body.productId
    const product = await Product.findByPk(newProductId)

    // Grab user's cart
    const userCart = await Order.findOne({
      where: {
        userId: req.params.id,
        isFulfilled: false,
      },

      include: {
        model: ProductOrder,
        include: [Product],
      },
    })

    // Grab line items from that cart
    const productOrders = userCart.productorders

    // See if product-to-be-added is already in the cart
    const indexOfItem = productOrders
      .map((productOrder) => productOrder.productId)
      .indexOf(newProductId)

    // If it's not in the cart, add the product to that user's order
    if (indexOfItem === -1) {
      await userCart.addProduct(product, {
        through: {quantity: 1, subtotal: 1 * product.price},
      })

      // Query the database for the new productOrder and include the product
      let newProductOrder = await userCart.getProductorders({
        where: {
          productId: product.id,
        },
        include: [Product],
      })

      // ^this returns an array but there should only be one instance, so grab the first row
      newProductOrder = newProductOrder[0]

      // Send the line item back to the front end
      res.json(newProductOrder)

      // Else if it IS already in the cart, just increment the quantity and the subtotal
    } else {
      // Save new information
      const productOrder = productOrders[indexOfItem]
      await productOrder.increment('quantity')
      productOrder.subtotal = product.price * productOrder.quantity
      await productOrder.save()

      // Send the new product order back to the front end
      res.json(productOrder)
    }
  } catch (err) {
    next(err)
  }
})
