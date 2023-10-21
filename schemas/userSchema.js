const Joi = require('joi');

const id = Joi.number().integer();
const userName = Joi.string().min(3).max(80);
const lastName = Joi.string().min(3).max(80);
const email = Joi.string().email();
const password = Joi.string().min(8).max(15);
const active = Joi.boolean().default(true);

const createUserSchema = Joi.object({
    userName: userName.required(),
    lastName: lastName.required(),
    email: email.required(),
    password: password.required()
    // active: active.required()
});

const updateUserSchema = Joi.object({
    userName: userName,
    lastName: lastName,
    email: email,
    password: password
    // active: active
});

const getUserSchema = Joi.object({
    id: id.required()
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };