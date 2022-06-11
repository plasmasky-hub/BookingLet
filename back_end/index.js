require('dotenv').config();
const express = require('express');
require('express-async-errors');
// import express from 'express';

const app = express();
const port = 8000;


const morgan = require('morgan');
const mainRouter = require('./routes');
const { connectToDB } = require('./utils/db');
const errorHandler = require('./middleware/errorHandler');

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/', mainRouter);

app.use(errorHandler);

connectToDB();

app.listen(port, () => console.log(`Example app listening on port ${port}!`));