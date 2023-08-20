const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();

const products = []; // Empty array to fake the DB for this exercise. Try to use not more than 30 "registers"
/*const limit = 30;
for (let i = 0; i < limit; i++) {
  products.push({
    id: i + 1,
    product_name: faker.commerce.productName(),
    price: parseInt(faker.commerce.price(), 10),
    image: faker.image.url()
  });
}*/

router.get('/', (req, res) => {
  // const { size } = req.query;
  res.json(products);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  product = products.find(product => product.id === parseInt(id));
  if (!product) {
    res.status(404).send('Producto no encontrado');
  }
  res.json(product);
});

router.post('/', (req, res) => {
  const body = req.body;
  
  if (products.length === 0) {
    products.push({
      id: 1,
      product_name: body.name,
      price: parseInt(body.price, 10),
      image: body.image || faker.image.url() // This generates a fake image url in case the user does not send one
    });
  } else {
    const lastProductId = products[products.length - 1].id;
    products.push({
      id: lastProductId + 1,
      product_name: body.name,
      price: parseInt(body.price, 10),
      image: body.image || faker.image.url() // This generates a fake image url in case the user does not send one
    });
  }

  res.status(201).json({
    message: 'Producto creado',
    data: body
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  product = products.find(product => product.id === parseInt(id));
  if (!product) {
    res.status(404).send('Producto no encontrado');
  }

  category.id = category.id;
  category.name = body.name || category.name;
  category.description = body.description || category.description;

  res.status(200).json({
    message: 'Producto actualizado',
    data: body
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  product = products.findIndex(product => product.id === parseInt(id));
  if (!product) {
    res.status(404).send('Producto no encontrado');
  }
  products.splice(product, 1);
  res.json({
    message: 'Producto eliminado',
    id
  });
});

module.exports = router;
