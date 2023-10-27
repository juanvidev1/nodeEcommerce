// This can be the same that DTO (Data Transfer Object).
const Joi = require("joi");
const { createCategorySchema, updateCategorySchema } = require('./categorySchema');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(100);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();
const description = Joi.string().min(10);
const categoryId = Joi.number().integer();
// const updateCategory = Joi.number().integer();//updateCategorySchema;
const stock = Joi.number().integer().min(1).max(1000000)

const createProductSchema = Joi.object({
    name: name.required(),
    price: price.required(),
    image: image.required(),
    description: description,
    stock: stock.required(),
    categoryId: categoryId.required()
});

const updateProductSchema = Joi.object({
    name: name,
    price: price,
    image: image,
    description: description,
    stock: stock,
    categoryId: categoryId
});

// In this case, it's a good practice to create a schema for the get product as an object; it doesn't
// matter that it only has one field. This is in case that in any moment we need to include more
// fields in the get product schema. In this case, we can just add more fields to the schema and
// it will work.
// const getProductSchema = Joi.object({
//     id: id
// }
const getProductSchema = Joi.object({
    id: id.required()
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema };

//After we've created the schemas, we can export them to use it in a handler.