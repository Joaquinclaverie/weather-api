var express = require('express');
var logger = require('morgan');
const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
var indexRouter = require('./routes/index');
var weatherRouter = require('./routes/weather');
var swaggerOptions = require('./swaggerOptions')
require('dotenv').config();
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);
app.use('/v1', weatherRouter);
app.use(
  "/swagger",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsDoc(swaggerOptions))
)

const PORT = process.env.APP_PORT;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }
