'use strict';

const { UserSchema, USER_TABLE } = require('./../models/userModel');
const { CategorySchema, CATEGORY_TABLE } = require('./../models/categoryModel');
const { ProductSchema, PRODUCT_TABLE } = require('./../models/productModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * This method allows to create the table User
   */
  async up (queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
  },

  /**
   * This method allows to rollback the changes made by this migration
   */
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
  }
};
