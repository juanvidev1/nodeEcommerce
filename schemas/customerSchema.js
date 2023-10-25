const Joi = require("joi");
const { createUserSchema, updateUserSchema } = require("./userSchema");

const id = Joi.number().integer();
const phone = Joi.string().min(10).max(15);
const userId = Joi.number().integer();

const createCustomerSchema = Joi.object({
    phone: phone.required(),
    user: createUserSchema,
});

const updateCustomerSchema = Joi.object({
    phone: phone,
    user: userId
});

const getCustomerSchema = Joi.object({
    id: id.required()
});

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema };