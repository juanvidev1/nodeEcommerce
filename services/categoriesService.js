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

  getCategory(id) {
    const category = this.categories.find(item => item.id === parseInt(id)); // Try to find the category using the id passed as param in your categories array;
    if (!category) {
      throw boom.notFound('Categoria no encontrada');
    }
    return category;
  }

  createCategory(data) {
    const newCategory = {
      id: this.categories.length + 1,
      ...data
    }
    this.categories.push(newCategory);
    return newCategory;
  }

  updateCategory(id, data) {
    const index = this.categories.findIndex(item => item.id === parseInt(id));

    if (index === -1) {
      throw boom.notFound('Categoria no encontrada');
    }

    const category = this.categories[index];

    this.categories[index] = {
      ...category,
      ...data
    }

    return this.categories[index];
  }

  deleteCategory(id) {
    const index = this.categories.findIndex(item => item.id === parseInt(id));

    if (index === -1) {
      throw boom.notFound('Categoria no encontrada');
    }

    this.categories.splice(index, 1);
    return { id };
  }

}

module.exports = CategoriesService;
