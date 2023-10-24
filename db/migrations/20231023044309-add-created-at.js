'use strict';

const { CATEGORY_TABLE, CategorySchema } = require('./../models/categoryModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(CATEGORY_TABLE, 'created_at', CategorySchema.createdAt);
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(CATEGORY_TABLE, 'created_at');
  }
};
