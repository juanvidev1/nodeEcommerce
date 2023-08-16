const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const categories = [
  {
    id: 1,
    'name': 'Categoria 1',
    'description': 'Descripcion de la categoria 1'
  },
  {
    id: 2,
    'name': 'Categoria 2',
    'description': 'Descripcion de la categoria 2'
  },
  {
    id: 3,
    'name': 'Categoria 3',
    'description': 'Descripcion de la categoria 3'
  }
];

const products = [
  {
    id: 1,
    'product_name': 'Producto 1',
    'price': 1000
  },
  {
    id: 2,
    'product_name': 'Producto 2',
    'price': 2000
  },
  {
    id: 3,
    'product_name': 'Producto 3',
    'price': 3000
  }
];

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/categories', (req, res) => {
  res.json(categories);
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
    res.json(products);
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

app.listen(port, () => {
  console.log('App corriendo en el puerto ' + port);
});
