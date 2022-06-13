// import dotenv from 'dotenv';
const mongoose = require('mongoose');
require('dotenv').config();

function connectToDB() {
  const connectionString = process.env.MONGODB_CONNECTION_URL;

  if (!connectionString) {
    console.error('Connect string not defined.');
    process.exit(1);
  }

  const db = mongoose.connection;

  db.on('connected', () => {
    console.log(`DB connected to ${connectionString} `);
  });

  db.on('error', (error) => {
    console.error(error.message);
    process.exit(2);
  });

  db.on('disconnected', () => {
    console.log(`DB disconnected.`);
  });

  return mongoose.connect(connectionString);
}

module.exports = { connectToDB };
