'use strict';

const { OrderProductSchema, ORDER_PRODUCT_TABLE } = require('./../models/orderProduct')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
  }
};
