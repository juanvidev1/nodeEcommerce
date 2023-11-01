const express = require('express');
const OrderService = require('../services/ordersService');
const validatorHandler = require('../middleware/validatorHandler');
const { createOrderSchema, getOrderSchema, updateOrderSchema } = require('../schemas/orderSchema');

const router = express.Router();

const service = new OrderService();

router.get('/', async (req, res) => {
    const orders = await service.findOrder();
    res.json(orders);
});

router.post('/',
    validatorHandler(createOrderSchema, 'body'),
    async (req, res) => {
    const body = req.body;
    const order = await service.createOrder(body);
    res.json(order);
});

router.get('/:id',
    validatorHandler(getOrderSchema, 'params'),
    async (req, res) => {
    const { id } = req.params;
    const order = await service.findOrderById(id);
    res.json(order);
});

router.patch('/:id',
    validatorHandler(getOrderSchema, 'params'),
    validatorHandler(updateOrderSchema, 'body'),
    async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const order = await service.updateOrder(id, body);
    res.json(order);
});

router.delete('/:id', 
    validatorHandler(getOrderSchema, 'params'),
    async (req, res) => {
    const { id } = req.params;
    const order = await service.deleteOrder(id);
    res.json(order);
});

module.exports = router;