const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();

router.get('/', (req, res) => {
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

module.exports = router;
