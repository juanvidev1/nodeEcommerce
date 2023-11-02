const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const paymentMethod = Joi.string().min(5).max(30);
const state = Joi.string().min(3).max(15);
const isDeliverable = Joi.boolean();
const shippingAddress = Joi.string().min(7).max(80);
const billingAddress = Joi.string().min(7).max(80);
const shippingMethod = Joi.string().min(3).max(30);
const shippingCost = Joi.number();
const totalPrice = Joi.number();

const createOrderSchema = Joi.object({
    customerId: customerId.required(),
    paymentMethod: paymentMethod.required(),
    state: state,
    isDeliverable: isDeliverable,
    shippingAddress: shippingAddress,
    billingAddress: billingAddress,
    shippingMethod: shippingMethod,
    shippingCost: shippingCost,
    totalPrice: totalPrice
});

const getOrderSchema = Joi.object({
    id: id.required()
});

const updateOrderSchema = Joi.object({
    paymentMethod: paymentMethod,
    state: state,
    isDeliverable: isDeliverable,
    shippingAddress: shippingAddress,
    billingAddress: billingAddress,
    shippingMethod: shippingMethod,
    shippingCost: shippingCost,
    totalPrice: totalPrice
});

module.exports = { createOrderSchema, getOrderSchema, updateOrderSchema };