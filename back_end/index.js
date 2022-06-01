const express = require('express')
const app = express()
const port = 3000

require('dotenv').config();
const morgan = require('morgan');
const mainRouter = require('./routes');
const { connectToDB } = require('./utils/db');

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/', mainRouter);

connectToDB();

app.listen(port, () => console.log(`Example app listening on port ${port}!`))