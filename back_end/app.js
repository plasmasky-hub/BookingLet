const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const app = express();
require('express-async-errors');
const swaggerUi = require('swagger-ui-express');

const router = require('./routes');
const swaggerJsDoc = require('./utils/swagger');

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));
app.use(errorHandler);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc));

app.use('/v1', router);

module.exports = app;
