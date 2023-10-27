const { faker, th } = require("@faker-js/faker");
const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class CategoriesService {

  constructor() {}

  async getAllCategories() {
    const res = await models.Category.findAll();
    
    if (res.length === 0) {
      throw boom.notFound('No hay categorias');
    }
    return res;
  }

  async getCategory(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products']
    });
    if (!category) {
      throw boom.notFound('Categoria no encontrada');
    }
    return category;
  }

  async createCategory(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async updateCategory(id, data) {
    const category = await this.getCategory(id);

    const res = await category.update(data);

    return res;
  }

  async deleteCategory(id) {
    const category = await this.getCategory(id);
    await category.destroy();

    return { id };
  }

}

module.exports = CategoriesService;
