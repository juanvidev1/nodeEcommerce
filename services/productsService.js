const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class ProductsService {
  constructor() {}

  async getAllProducts() {
    const res = await models.Product.findAll();
    
    if(res.length === 0) {
      throw boom.notFound('No hay productos');
    }

    return res;
  };

  getProductById(id) {
    const product = models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('Producto no encontrado'); // We need to create a boom error handler in the error handler file
    }
    if (product.product_active === false) {
      throw boom.conflict('Producto bloqueado'); // This could be something that can be used as a bussiness logic. IE A product will be blocked if the store gets out of stock of the product
    }  
    return product;
  };

  createProduct(data) {
    const newProduct = {
      id: this.products.length + 1,
      ...data
    }

    this.products.push(newProduct);
    return newProduct;
  };

  updateProduct(id, changes) {
    const index = this.products.findIndex(product => product.id === parseInt(id));
        if (index === -1) {
          return boom.notFound('Producto no encontrado'); // Don't forget to use reject in promises when using a setTimeout method        }
        }

        const product = this.products[index];
        this.products[index] = {
          ...product,
          ...changes
        };

    return this.products[index];
  };

  deleteProduct(id) {
    const index = this.products.findIndex(item => item.id === parseInt(id));
    if (index === -1) {
      return 'Producto no encontrado';
    }

    this.products.splice(index, 1);
    
    return { id };
  };
}

module.exports = ProductsService;
