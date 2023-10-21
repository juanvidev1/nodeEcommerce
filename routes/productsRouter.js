const express = require('express');
const ProductsService = require('../services/productsService');
const validatorHandler = require('../middleware/validatorHandler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/productSchema');


const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res, next) => {
  try {
    const products = await service.getAllProducts();

    res.json(products); 
  } catch (error) {
    next(error);
  }
  
});

router.get('/:id', 
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      product = await service.getProductById(id);
      res.json(product);
    } catch (error) {
      next(error); // This is the way to use the error handler middleware
    }
  }
);

router.post('/', 
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const newProduct = await service.createProduct(body);

      res.status(201).json({
        message: 'Producto creado',
        data: newProduct
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id', 
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      product = await service.updateProduct(id, body);

      res.status(200).json({
        message: 'Producto actualizado',
        data: product
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', 
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      product = await service.deleteProduct(id);

      res.json({
        message: 'Producto eliminado',
        data: product
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
