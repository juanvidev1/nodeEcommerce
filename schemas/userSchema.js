const Joi = require('joi');

const id = Joi.number().integer();
const userName = Joi.string().min(3).max(80);
const lastName = Joi.string().min(3).max(80);
const email = Joi.string().email();
const password = Joi.string().min(8).max(15);
const active = Joi.boolean().default(true);
const isAdmin = Joi.boolean().default(false);

const createUserSchema = Joi.object({
    firstName: userName.required(),
    lastName: lastName.required(),
    email: email.required(),
    password: password.required(),
    isAdmin: isAdmin

});

const updateUserSchema = Joi.object({
    firstName: userName,
    lastName: lastName,
    email: email,
    password: password,
    active: active,
    isAdmin: isAdmin
});

const getUserSchema = Joi.object({
    id: id.required()
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };