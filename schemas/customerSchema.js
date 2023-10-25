const Joi = require("joi");

const id = Joi.number().integer();
const firstName = Joi.string().min(3).max(30);
const lastName = Joi.string().min(3).max(30);
const phone = Joi.string().min(10).max(15);

const createUserSchema = Joi.object({
    firstName: firstName.required(),
    lastName: lastName.required(),
    phone: phone.required()
});

const updateUserSchema = Joi.object({
    firstName: firstName,
    lastName: lastName,
    phone: phone
});

const getUserSchema = Joi.object({
    id: id.required()
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };