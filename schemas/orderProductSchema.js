const Joi = require('joi');

const id = Joi.number().integer();
const amount = Joi.number().integer().min(1);
const orderId = Joi.number().integer();
const productId = Joi.number().integer();

const addItemSchema = Joi.object({
    amount: amount.required(),
    orderId: orderId.required(),
    productId: productId.required()
});

const getOrderProductSchema = Joi.object({
    id: id.required()
});

module.exports = { addItemSchema, getOrderProductSchema };