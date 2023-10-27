const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class ProductsService {
  constructor() {}

  async getAllProducts() {
    const res = await models.Product.findAll({
      include: ['category']
    });
    
    if(res.length === 0) {
      throw boom.notFound('No hay productos');
    }

    return res;
  };

  async getProductById(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('Producto no encontrado'); // We need to create a boom error handler in the error handler file
    }
    if (product.product_active === false) {
      throw boom.conflict('Producto bloqueado'); // This could be something that can be used as a bussiness logic. IE A product will be blocked if the store gets out of stock of the product
    }  
    return product;
  };

   async createProduct(data) {
    const newProduct = await models.Product.create(data);

    return newProduct;
  };

  async updateProduct(id, changes) {
    const product = await this.getProductById(id);
    const res = await product.update(changes);

    return res;
  };

  async deleteProduct(id) {
    const product = this.getProductById(id);
    await product.destroy();
    return { id };
  };
}

module.exports = ProductsService;
