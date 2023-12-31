const express = require('express');
const productsRouter = require('./productsRouter');
const categoriesRouter = require('./categoriesRouter');
const usersRouter = require('./usersRouter');
const CustomersRouter = require('./customersRouter');
const OrderRouter = require('./ordersRouter');


function routerApi(app) {
  router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);
  router.use('/customers', CustomersRouter);
  router.use('/orders', OrderRouter);
}

module.exports = routerApi;
