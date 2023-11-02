const express = require('express');
const OrderProductService = require('./../services/orderProductsService');
const validatorHandler = require('../middleware/validatorHandler');

const { addItemSchema, getOrderProductSchema } = require('./../schemas/orderProductSchema');
const service = new OrderProductService();

const router = express.Router();

router.get('/:id',
validatorHandler(getOrderProductSchema, 'params'), 
async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/total-price', 
validatorHandler(getOrderProductSchema, 'params'),
async (req, res, next) => {
    try {
        const { id } = req.params;
        const totalPrice = await service.calculateTotalPrice(id);
        await service.updateOrderTotalPrice(id, totalPrice);
        res.json({"message": "El precio fue cambiado con éxito"});
    } catch (error) {
        next(error);
    }

});

router.post('/add', 
validatorHandler(addItemSchema, 'body'), 
async (req, res, next) => {
    try {
    const body = req.body;
    const newItem = await service.create(body);
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
});

module.exports = router;