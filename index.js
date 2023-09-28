const express = require('express');
const routerApi = require('./routes');
const app = express();
const port = process.env.PORT || 5000;

const { logErrors, errorHandler } = require('./middleware/errorHandler');

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!');
});

routerApi(app);

/**
 * It's importanrt to define the use of the error handler after router and it's important the error middleware has the correct order
 */
app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => {
  console.log('App corriendo en el puerto ' + port);
});
