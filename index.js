const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/categories', (req, res) => {
  res.json({
    'name': 'Categoria 1',
    'description': 'Descripcion de la categoria 1'
  });
});

app.get('/api/products', (req, res) => {
    res.json({
      'product_name': 'Producto 1',
      'price': 1000
    });
});

app.listen(port, () => {
  console.log('App corriendo en el puerto ' + port);
});
