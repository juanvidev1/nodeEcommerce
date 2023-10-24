const express = require('express');
const routerApi = require('./routes');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const port = process.env.PORT || 5000;

const { logError, errorHandler, boomErrorHandler } = require('./middleware/errorHandler');

app.use(express.json());

// We can give access only to specific domains
const whitelist = ['http://localhost:5000/', 'http://localhost:3000/'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    }
  }
}
app.use(cors(options));
app.use(morgan('dev'));


app.get('/', (req, res) => {
  res.send('Hello World!');
});

routerApi(app);

/**
 * It's importanrt to define the use of the error handler after router and it's important the error middleware has the correct order
 */
app.use(logError);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('App corriendo en el puerto ' + port);
});
