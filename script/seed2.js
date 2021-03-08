'use strict'

const db = require('../server/db')
const {User, Product, Order} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
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
      email: 'elena@email.com',
      password: '123',
      name: 'Elena King',
      address: '157 Lions Ct',
      city: 'Lake Zurich',
      state: 'IL',
      zip: '60047',
    }),
    User.create({
      email: 'sidney@email.com',
      password: '123',
      name: 'Sidney Hicks',
      address: '157 Lions Ct',
      city: 'Chicago',
      state: 'IL',
      zip: '60047',
    }),
    User.create({
      email: 'byron@email.com',
      password: '123',
      name: 'Byron Hawkins',
      address: '2948 Victoria Ln',
      city: 'Allentown',
      state: 'PA',
      zip: '18101',
    }),
    User.create({
      email: 'jenny@email.com',
      password: '123',
      name: 'Jenny Howard',
      address: '8090 Elm St',
      city: 'Marshall',
      state: 'VA',
      zip: '20116',
    }),
    User.create({
      email: 'susie@email.com',
      password: '123',
      name: 'Susie Hanson',
      address: '1252 Oak St',
      city: 'Berger',
      state: 'MO',
      zip: '63014',
    }),
    User.create({
      email: 'aubree@email.com',
      password: '123',
      name: 'Aubree Jordan',
      address: '2708 Victoria Ln',
      city: 'Allentown',
      state: 'PA',
      zip: '18101',
    }),
    User.create({
      email: 'greg@email.com',
      password: '123',
      name: 'Greg Parker',
      address: '8400 Elm St',
      city: 'Marshall',
      state: 'VA',
      zip: '20116',
    }),
    User.create({
      email: 'lisa@email.com',
      password: '123',
      name: 'Lisa Carroll',
      address: '3 Maple St',
      city: 'Berger',
      state: 'MO',
      zip: '63014',
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
    // User.create({email: 'murphy@email.com', password: '123'}),
  ])
  const products = await Promise.all([
    Product.create({
      name: 'Glitter Delight',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et tortor at risus viverra adipiscing at in tellus.',
      imageUrl: '/images/candle-01.jpg',
      price: 5,
    }),
    Product.create({
      name: 'Lavender Fields',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et tortor at risus viverra adipiscing at in tellus.',
      imageUrl: '/images/candle-02.jpg',
      price: 15,
    }),
    Product.create({
      name: 'Sea Breeze',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et tortor at risus viverra adipiscing at in tellus.',
      imageUrl: '/images/candle-03.jpg',
      price: 10,
    }),
    Product.create({
      name: 'Alpine Spice',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et tortor at risus viverra adipiscing at in tellus.',
      imageUrl: '/images/candle-04.jpg',
      price: 10,
    }),
    Product.create({
      name: 'Spa Sensation',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et tortor at risus viverra adipiscing at in tellus.',
      imageUrl: '/images/candle-05.jpg',
      price: 25,
    }),
    Product.create({
      name: 'Linen Moments',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et tortor at risus viverra adipiscing at in tellus.',
      imageUrl: '/images/candle-06.jpg',
      price: 17,
    }),
    Product.create({
      name: 'Ruby Blush',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et tortor at risus viverra adipiscing at in tellus.',
      imageUrl: '/images/candle-07.jpg',
      price: 10,
    }),
    Product.create({
      name: 'Cinnamon Spice',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et tortor at risus viverra adipiscing at in tellus.',
      imageUrl: '/images/candle-08.jpg',
      price: 13,
    }),
    Product.create({
      name: 'Lily Relaxation',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et tortor at risus viverra adipiscing at in tellus.',
      imageUrl: '/images/candle-09.jpg',
      price: 16,
    }),
    Product.create({
      name: 'Harvest Moon',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et tortor at risus viverra adipiscing at in tellus.',
      imageUrl: '/images/candle-10.jpg',
      price: 21,
    }),
    Product.create({
      name: 'Koala Kandle',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et tortor at risus viverra adipiscing at in tellus.',
      imageUrl: '/images/candle-11.jpg',
      price: 8,
    }),
  ])

  let orders = []
  for (let i = 0; i < 10; i++) {
    orders.push(await Order.create({userId: users[i].id, isFulfilled: false}))
  }

  await orders[0].addProduct(products[0], {
    through: {quantity: 1, subtotal: 1 * products[0].price},
  })

  await orders[1].addProduct(products[0], {
    through: {quantity: 2, subtotal: 2 * products[0].price},
  })

  await orders[1].addProduct(products[1], {
    through: {quantity: 1, subtotal: 1 * products[1].price},
  })

  await orders[1].addProduct(products[2], {
    through: {quantity: 1, subtotal: 1 * products[2].price},
  })

  await orders[1].addProduct(products[3], {
    through: {quantity: 3, subtotal: 3 * products[3].price},
  })

  await orders[1].addProduct(products[4], {
    through: {quantity: 2, subtotal: 2 * products[4].price},
  })

  await orders[2].addProduct(products[5], {
    through: {quantity: 1, subtotal: 1 * products[5].price},
  })

  await orders[2].addProduct(products[6], {
    through: {quantity: 1, subtotal: 1 * products[6].price},
  })

  await orders[3].addProduct(products[6], {
    through: {quantity: 1, subtotal: 1 * products[6].price},
  })

  await orders[4].addProduct(products[6], {
    through: {
      quantity: 1,
      subtotal: 1 * products[6].price,
    },
  })

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
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

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
