const express = require('express');
const routerApi = require('./routes');
const app = express();
const port = process.env.PORT || 5000;


app.get('/', (req, res) => {
  res.send('Hello World!');
});

routerApi(app);

app.listen(port, () => {
  console.log('App corriendo en el puerto ' + port);
});
