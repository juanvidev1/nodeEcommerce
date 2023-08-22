const express = require('express');
const UsersService = require('../services/usersService');

const service = new UsersService();

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
  res.status(200).json(service.getAllUsers());
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = service.getUserById(id);
  if (!user) {
    res.status(404).json({
      message: 'Usuario no encontrado'
    })
  }
  res.status(200).json(user);

});

router.post('/', (req, res) => {
  const body = req.body;
  const newUser = service.createUser(body);

  res.status(201).json({
    message: 'Usuario creado',
    data: newUser
  })
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const user = service.updateUser(id, body);

  res.status(200).json({
    message: 'Usuario actualizado',
    data: user
  });

});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const response = service.deleteUser(id);
  res.status(200).json({
    message: 'Usuario eliminado',
    data: response
  });
});

module.exports = router;
