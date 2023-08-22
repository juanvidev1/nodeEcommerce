const { faker } = require("@faker-js/faker");

class CategoriesService {

  constructor() {
    this.categories = []; // Start an empty array. This is gonna fake the DB for this exercise. Try to use not moore than 30 "registers"
    this.generate();

  }

  /**
   * This method will populate our categories array with fake data.
   * @returns {void}
   */
  generate() {
    const limit = 10;
    for (let index = 0; index < limit; index++) {
      this.categories.push({
        id: index + 1,
        name: faker.commerce.department(),
        image: faker.image.url(),
      });
    }
  }

  getAllCategories() {
    if (this.categories.length === 0) {
      return "No existe ninguna categoria"
    }
    return this.categories;
  }

  getCategory(id) {
    return this.categories.find(item => item.id === parseInt(id)); // Try to find the category using the id passed as param in your categories array
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
      throw new Error('Categoria no encontrada');
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
      throw new Error('Categoria no encontrada');
    }

    this.categories.splice(index, 1);
    return { id };
  }

}

module.exports = CategoriesService;
