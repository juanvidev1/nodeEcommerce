const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  /**
   * This method is used to generate fake products.
   * @returns {void}
   */
  generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: i + 1,
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isBlocked: faker.datatype.boolean()
      });
    }
  };

  getAllProducts() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 5000);
    });
  };

  getProductById(id) {
    const product = this.products.find(product => product.id === parseInt(id));
    if (!product) {
      throw boom.notFound('Producto no encontrado'); // We need to create a boom error handler in the error handler file
    }
    if (product.isBlocked) {
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
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(newProduct);
      }, 5000);
    });
  };

  updateProduct(id, changes) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.products.findIndex(product => product.id === parseInt(id));
        if (index === -1) {
          reject(boom.notFound('Producto no encontrado')); // Don't forget to use reject in promises when using a setTimeout method
        }

        const product = this.products[index];
        this.products[index] = {
          ...product,
          ...changes
        };

        resolve(this.products[index]);
      }, 2000);
    });
  };

  deleteProduct(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.products.findIndex(product => product.id === parseInt(id));
        if (index === -1) {
          reject('Producto no encontrado');
        }

        this.products.splice(index, 1);
        resolve({ id });
      }, 5000);

    });
  };
}

module.exports = ProductsService;
