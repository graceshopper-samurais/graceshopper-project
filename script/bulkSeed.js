'use strict'
const faker = require('faker')
const db = require('../server/db')
const {User, Product, Order} = require('../server/db/models')

//configure bulk seeding parameters here
const NUM_PRODUCTS = 200 //>=3
const NUM_USERS = 100 //In addition to 3 default users
const USERS_WITH_ORDERS = 50 //Probability user has an order 0 - 100
const ORDERS_FULFILLED = 50 //Probability order is fulfilled 0 - 100
const MAX_LINES_PER_ORDER = 10
const MAX_QTY_PER_LINE = 8
const MIN_PRICE = 5
const MAX_PRICE = 25

const fakeUser = () => {
  return {
    email: faker.internet.email(),
    password: '123',
    name: faker.name.findName(),
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.stateAbbr(),
    zip: faker.address.zipCode(),
  }
}

const fakeProduct = (i) => {
  let image = '/images/candle-' + ((i + 30) % 31) + '.jpg'
  let prodName = faker.commerce.productAdjective() + ' Candle'
  return {
    name: prodName,
    description: faker.lorem.sentences(2),
    imageUrl: image,
    price: Math.floor((MAX_PRICE + 1 - MIN_PRICE) * Math.random() + MIN_PRICE),
  }
}

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  //create three default users
  const defaultUsers = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
      name: 'Cody Moore',
      address: '145 Main Street',
      city: 'Chicago',
      state: 'IL',
      zip: '60080',
    }),
    User.create({
      email: 'murphy@email.com',
      password: '123',
      name: 'Murphy Arnold',
      address: '335 Lakeshore Dr',
      city: 'Chicago',
      state: 'IL',
      zip: '60080',
    }),
    User.create({
      email: 'admin@email.com',
      password: '123',
      name: 'admin',
      address: '1 Fullstack Dr',
      city: 'Chicago',
      state: 'IL',
      zip: '60080',
      admin: true,
    }),
  ])

  //Create bulk products
  let products = []
  for (let i = 1; i <= NUM_PRODUCTS; i++) {
    products.push(await Product.create(fakeProduct(i)))
  }

  //Create default orders for Cody & Murphy (i.e. the default users)
  let defaultOrders = []
  for (let i = 0; i < 2; i++) {
    defaultOrders.push(
      await Order.create({userId: defaultUsers[i].id, isFulfilled: false})
    )
  }

  await defaultOrders[0].addProduct(products[0], {
    through: {quantity: 1, subtotal: 1 * products[0].price},
  })

  await defaultOrders[1].addProduct(products[0], {
    through: {quantity: 2, subtotal: 2 * products[0].price},
  })

  await defaultOrders[1].addProduct(products[1], {
    through: {quantity: 1, subtotal: 1 * products[1].price},
  })

  await defaultOrders[1].addProduct(products[2], {
    through: {quantity: 1, subtotal: 1 * products[2].price},
  })

  //Create bulk users (in addition to default users)
  let users = []
  for (let i = 1; i <= NUM_USERS; i++) {
    users.push(await User.create(fakeUser()))
  }

  //Create bulk orders - fulfilled and unfulfilled, random number line items, random qty
  for (let i = 0; i < users.length; i++) {
    //determine if user will have an order
    if (Math.random() < USERS_WITH_ORDERS / 100) {
      let orderFulfilled = Math.random() < ORDERS_FULFILLED / 100 //determine if order isFulfilled
      let order = await Order.create({
        userId: users[i].id,
        isFulfilled: orderFulfilled,
      })
      let numberLines = Math.ceil(MAX_LINES_PER_ORDER * Math.random()) //determine how many order lines
      for (let j = 1; j <= numberLines; j++) {
        let qty = Math.ceil(MAX_QTY_PER_LINE * Math.random()) //determiine qty per line item
        let ranProdInd = Math.floor(NUM_PRODUCTS * Math.random()) //random product selection
        let linePrice = qty * products[ranProdInd].price
        await order.addProduct(products[ranProdInd], {
          through: {quantity: qty, subtotal: linePrice},
        })
      }
    }
  }

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded successfully`)
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if (module === require.main) {
  runSeed()
}

module.exports = seed
