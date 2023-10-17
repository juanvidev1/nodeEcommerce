const express = require('express');
const ProductsService = require('../services/productsService');
const validatorHandler = require('../middleware/validatorHandler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/productSchema');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  // const { size } = req.query;
  products = await service.getAllProducts();

  res.json(products);
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
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.createProduct(body);

    res.status(201).json({
      message: 'Producto creado',
      data: newProduct
    });
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
  async (req, res) => {
    const { id } = req.params;
    product = await service.deleteProduct(id);

    res.json({
      message: 'Producto eliminado',
      data: product
    });
  }
);

module.exports = router;
