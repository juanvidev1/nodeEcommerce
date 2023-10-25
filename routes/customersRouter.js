const express = require('express');
const CustomerService = require('../services/customersService');
const validatorHandler = require('../middleware/validatorHandler');
const { createCustomerSchema, updateCustomerSchema, getCustomerSchema } = require('../schemas/customerSchema');
import * as next from 'next';

const router = express.Router();
const service = new CustomerService();

router.get('/', async (req, res) => {
    try {
        const customers = await service.getAllCustomers();
        return res.json(customers);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', 
validatorHandler(getCustomerSchema, 'params'),
async (req, res, next) => {
    try {
        const { id } = req.params;
        const customer = await service.getCustomer(id);
        return res.json(customer);
    } catch (error) {
        next(error);
    }
});

router.post('/', validatorHandler(createCustomerSchema, 'body'),
async (req, res, next) => {
    try {
        const body = req.body;
        const newCustomer = await service.createCustomer(body);
        return res.status(201).json(newCustomer);
    } catch (error) {
        next(error);
    }
});

router.patch('/:id', validatorHandler(getCustomerSchema, 'params'), 
validatorHandler(updateCustomerSchema, 'body'),
async (req, res, next) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const customer = await service.updateCustomer(id, body);
        return res.json(customer);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', validatorHandler(getCustomerSchema, 'params'),
async (req, res, next) => {
    try {
        const { id } = req.params;
        const customer = await service.deleteCustomer(id);
        return res.json(customer);
    } catch (error) {
        next(error);
    }
});