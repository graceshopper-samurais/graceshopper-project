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

    console.log('productId———————', product.id)

    console.log('req.params.id', req.params.id)

    // Grab user's cart
    const userCart = await Order.findOne({
      where: {
        userId: req.params.id,
        isFulfilled: false,
      },
      include: [ProductOrder],
    })

    // Grab line items from that cart
    const productOrders = userCart.productorders

    console.log(
      'productOrders.map————',
      productOrders.map((productOrder) => productOrder.id)
    )

    // See if product-to-be-added is already in the cart
    const indexOfItem = productOrders
      .map((productOrder) => productOrder.productId)
      .indexOf(newProductId)

    console.log('indexOfItem——————', indexOfItem)

    // If it's not in the cart, add the product to that user's order, it will return the line item
    if (indexOfItem === -1) {
      console.log('TOP—————————')

      const newProductOrder = await userCart.addProduct(product, {
        through: {quantity: 1, subtotal: 1 * product.price},
      })

      console.log('newProductOrder—————', newProductOrder)

      // Send the line item back to the front end
      res.json(newProductOrder)

      // Else if it IS already in the cart, just increment the quantity and the subtotal
    } else {
      console.log('BOTTOM———————')
      const productOrder = productOrders[indexOfItem]
      await productOrder.increment('quantity')
      productOrder.subtotal = product.price * productOrder.quantity
      await productOrder.save()
      console.log('productOrder bottom—————', productOrder)

      const experiment = await ProductOrder.findOne({
        where: {
          id: productOrder.id,
        },
        include: [Product],
      })

      console.log('experiment—————', experiment)

      // Send the new product order back to the front end
      res.json(productOrder)
    }
  } catch (err) {
    next(err)
  }
})
