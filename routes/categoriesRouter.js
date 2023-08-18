const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();

router.get('/', (req, res) => {
  const categories = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let i = 0; i < limit; i++) {
    categories.push({
      name: faker.commerce.department(),
      description: faker.commerce.productDescription()
    });
  }
  res.json(categories);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  category = categories.find(category => category.id === parseInt(id));
  if (!category) {
    res.status(404).send('Categoria no encontrada');
  }
  res.json(category);
});

router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json([
    {
      'product_name': 'Producto ' + productId + ' de la categoria ' + categoryId,
      'price': productId + categoryId * 100
    }
  ]);
});

module.exports = router;
