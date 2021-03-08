const router = require('express').Router()
const {User, Order, ProductOrder, Product} = require('../db/models')
module.exports = router
const {isAdmin, isCorrectUser} = require('./gatekeepers')

// GET /api/users
router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: [
        'id',
        'name',
        'email',
        'address',
        'city',
        'state',
        'zip',
        'admin'
      ]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// GET /api/users/:id
router.get('/:id', isAdmin, async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.id)
    res.json(singleUser)
  } catch (err) {
    next(err)
  }
})

//CART ROUTES

// GET /api/users/:id/cart
router.get('/:id/cart', isCorrectUser, async (req, res, next) => {
  try {
    const userCart = await Order.findOne({
      where: {
        userId: req.params.id,
        isFulfilled: false
      },
      include: {
        model: ProductOrder,
        include: [Product]
      }
    })

    userCart ? res.json(userCart.productorders) : res.send([])
  } catch (err) {
    next(err)
  }
})

// PUT /api/users/:id/cart
router.put('/:id/cart', isCorrectUser, async (req, res, next) => {
  try {
    // Grab existing (old) product that already exists in cart
    const oldProductId = req.body.productId
    // this is currently logging as `undefined` ; where does `req.body.productId` come in?
    console.log('this is oldProductId ------', oldProductId)
    const {quantity} = req.body
    const product = await Product.findByPk(oldProductId)

    // Grab user's cart
    const userCart = await Order.findOne({
      where: {
        userId: req.params.id,
        isFulfilled: false
      },
      include: {
        model: ProductOrder,
        include: [Product]
      }
    })
    console.log('this is userCart------', userCart)

    // Grab line items from that cart
    const productOrders = userCart.productorders
    console.log('this is productOrders ------- ', productOrders)

    // Find index of specific item within cart
    const indexOfItem = productOrders
      .map(productOrder => productOrder.productId)
      .indexOf(oldProductId)

    // filter for....?
    // const productOrder = productOrders.filter(
    //   (order) => order.productId === oldProductId
    // )
    // console.log('this is productOrder ------ ', productOrder)

    // Since item is already in the cart, increment the quantity and subtotal
    // Save new information
    const productOrder = productOrders[indexOfItem]
    productOrder.quantity = quantity
    await productOrder.save()
    productOrder.subtotal = product.price * productOrder.quantity
    await productOrder.save()
    console.log('productOrder bottom—————', productOrder)

    res.json(productOrder)
  } catch (err) {
    next(err)
  }
})

// DELETE cart route
router.delete('/:id/cart/:line', isCorrectUser, async (req, res, next) => {
  try {
    await ProductOrder.destroy({where: {id: req.params.line}})
    res.status(204).send()
  } catch (err) {
    next(err)
  }
})

//PUT /api/users/:id/order/:orderId
router.put('/:id/order/:orderId', isCorrectUser, async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId)
    res.json(await order.update(req.body))
  } catch (err) {
    next(err)
  }
})

// POST cart route
router.post('/:id/cart', isCorrectUser, async (req, res, next) => {
  try {
    // Grab new product to add to cart
    const newProductId = req.body.productId
    const product = await Product.findByPk(newProductId)

    // Grab user's cart
    let userCart = await Order.findOne({
      where: {
        userId: req.params.id,
        isFulfilled: false
      },
      include: {
        model: ProductOrder,
        include: [Product]
      }
    })

    // if user doesn't have anything in cart yet, create a new order
    if (!userCart) {
      userCart = await Order.create({userId: req.params.id, isFulfilled: false})
      await userCart.addProduct(product, {
        through: {quantity: 1, subtotal: product.price}
      })
      await userCart.reload({
        include: {
          model: ProductOrder,
          include: [Product]
        }
      })

      res.json(userCart.productorders[0])
    } else {
      // Grab line items from that cart
      const productOrders = userCart.productorders

      // See if product-to-be-added is already in the cart
      const indexOfItem = productOrders
        .map(productOrder => productOrder.productId)
        .indexOf(newProductId)

      // If it's not in the cart, add the product to that user's order
      if (indexOfItem === -1) {
        await userCart.addProduct(product, {
          through: {quantity: 1, subtotal: 1 * product.price}
        })

        // Query the database for the new productOrder and include the product
        let newProductOrder = await userCart.getProductorders({
          where: {
            productId: product.id
          },
          include: [Product]
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
        console.log('productOrder bottom—————', productOrder)

        // Send the new product order back to the front end
        res.json(productOrder)
      }
    }
  } catch (err) {
    next(err)
  }
})
