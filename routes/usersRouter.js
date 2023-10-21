const express = require('express');
const UsersService = require('../services/usersService');
const validatorHandler = require('../middleware/validatorHandler');
const { createUserSchema, updateUserSchema, getUserSchema } = require('../schemas/userSchema');


const service = new UsersService();

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await service.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', 
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = service.getUserById(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/', 
  validatorHandler(createUserSchema, 'body'), 
  async (req, res) => {
  const body = req.body;
  const newUser = await service.createUser(body);

  res.status(201).json({
    message: 'Usuario creado',
    data: newUser
  })
});

router.patch('/:id', 
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const user = await service.updateUser(id, body);

  res.status(200).json({
    message: 'Usuario actualizado',
    data: user
  });

});

router.delete('/:id', 
  validatorHandler(getUserSchema, 'params'),
  async (req, res) => {
  const { id } = req.params;
  const response = await service.deleteUser(id);
  res.status(200).json({
    message: 'Usuario eliminado',
    data: response
  });
});

module.exports = router;
