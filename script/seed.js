'use strict';

const {
  db,
  models: { User },
} = require('../server/db');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const users = await User.bulkCreate(USER_SEED_DATA, { validate: true });

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
}

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

if (module === require.main) {
  runSeed();
}

module.exports = seed;

const USER_SEED_DATA = [
  {
    password: 'password123',
    firstName: 'Rhoda',
    lastName: 'Johnson',
    email: 'rjohnson0@gmail.com',
    address: '960 Cambridge Parkway',
    role: 'customer',
  },
  {
    password: 'hidden',
    firstName: 'Barbi',
    lastName: 'Jones',
    email: 'bjones@gmail.com',
    address: '123 Drury Lane',
    role: 'customer',
  },
  {
    password: 'shallnotpass',
    firstName: 'Funky',
    lastName: 'Brown',
    email: 'fbro9@gmail.com',
    role: 'admin',
  },
];
