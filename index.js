const express = require('express');
const { faker } = require('@faker-js/faker');
const app = express();
const port = process.env.PORT || 5000;


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/categories', (req, res) => {
  const categories2 = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let i = 0; i < limit; i++) {
    categories2.push({
      name: faker.commerce.department(),
      description: faker.commerce.productDescription()
    });
  }
  res.json(categories2);
});

app.get('/api/categories/:id', (req, res) => {
  const { id } = req.params;
  category = categories.find(category => category.id === parseInt(id));
  if (!category) {
    res.status(404).send('Categoria no encontrada');
  }
  res.json(category);
});

app.get('/api/products', (req, res) => {
  const products2 = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let i = 0; i < limit; i++) {
    products2.push({
      product_name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.url()
    });
  }
  res.json(products2);
});

app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  product = products.find(product => product.id === parseInt(id));
  if (!product) {
    res.status(404).send('Producto no encontrado');
  }
  res.json(product);
});

app.get('/api/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json([
    {
      'product_name': 'Producto ' + productId + ' de la categoria ' + categoryId,
      'price': productId + categoryId * 100
    }
  ]);
});

app.get('/api/users', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      'limit' : limit,
      'offset' : offset
    })
  }
  else if (limit) {
    res.json({
      'limit' : limit
    })
  }
  else if (offset) {
    res.json({
      'offset' : offset
    })
  } else {
    res.send('No hay parametros');
  }
});

app.listen(port, () => {
  console.log('App corriendo en el puerto ' + port);
});
