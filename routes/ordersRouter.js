const express = require('express');
const OrderService = require('../services/ordersService');
const validatorHandler = require('../middlewares/validatorHandler');

const router = express.Router();

const service = new OrderService();

router.get('/', async (req, res) => {
    const orders = await service.find();
    res.json(orders);
});

router.post('/', async (req, res) => {
    const data = req.body;
    const order = await service.create(data);
    res.json(order);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const order = await service.findOrderById(id);
    res.json(order);
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const order = await service.updateOrder(id, data);
    res.json(order);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const order = await service.deleteOrder(id);
    res.json(order);
});

module.exports = router;