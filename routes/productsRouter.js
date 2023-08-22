const express = require('express');
const ProductsService = require('../services/productsService');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  // const { size } = req.query;
  products = await service.getAllProducts();

  res.json(products);
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    product = await service.getProductById(id);
    res.json(product);
  } catch (error) {
    return res.status(404).json({
      message: error.message
    });
  }
});

router.post('/', async (req, res) => {
  const body = req.body;
  const newProduct = await service.createProduct(body);

  res.status(201).json({
    message: 'Producto creado',
    data: newProduct
  });
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  product = await service.updateProduct(id, body);

  res.status(200).json({
    message: 'Producto actualizado',
    data: product
  });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  product = await service.deleteProduct(id);

  res.json({
    message: 'Producto eliminado',
    data: product
  });
});

module.exports = router;
