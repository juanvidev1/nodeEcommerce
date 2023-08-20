const express = require('express');
const { faker } = require('@faker-js/faker');

const users = [];

const router = express.Router();

router.get('/', (req, res) => {
  /*const { limit, offset } = req.query;
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
  }*/
  if (users.length === 0) {
    res.status(404).json({
      message: 'No hay usuarios creados'
    })
  }

  res.status(200).json(users);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(user => user.id === id);
  if (!user) {
    res.status(404).json({
      message: 'Usuario no encontrado'
    })
  }
  res.status(200).json(user);

});

router.post('/', (req, res) => {
  const body = req.body;

  if (users.length === 0) {
    users.push({
      id: 1,
      userFirstName: body.userFirstName,
      userLastName: body.userLastName,
      userEmail: body.userEmail,
      userPassword: body.password
    });
  } else {
    const userLastId = users[users.length - 1].id;
    users.push({
      id: userLastId + 1,
      userFirstName: body.userFirstName,
      userLastName: body.userLastName,
      userEmail: body.userEmail,
      userPassword: body.password
    });
  }

  res.status(201).json({
    message: 'Usuario creado',
    data: body})
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const user = users.find(user => user.id === id);
  if (!user) {
    res.status(404).json({
      message: 'Usuario no encontrado'
    })
  }
  user.userFirstName = body.userFirstName || user.userFirstName;
  user.userLastName = body.userLastName || user.userLastName;
  user.userEmail = body.userEmail || user.userEmail;
  user.userPassword = body.password || user.userPassword;

  res.status(200).json({
    message: 'Usuario actualizado',
    data: body
  });

});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const user = users.findIndex(user => user.id === parseInt(id));
  console.log("Usuario a eliminar :" + user.id);
  if (!user) {
    res.status(404).json({
      message: 'Usuario no encontrado'
    })
  }
  users.splice(user, 1);
  res.status(200).json({
    message: 'Usuario eliminado',
    id
  });

});

module.exports = router;
