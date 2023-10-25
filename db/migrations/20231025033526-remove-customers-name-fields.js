'use strict';

const { CustomerSchema, CUSTOMER_TABLE } = require('./../models/customerModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn(CUSTOMER_TABLE, 'first_name', CustomerSchema);
    await queryInterface.removeColumn(CUSTOMER_TABLE, 'last_name', CustomerSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn(CUSTOMER_TABLE, 'first_name', CustomerSchema);
    await queryInterface.addColumn(CUSTOMER_TABLE, 'last_name', CustomerSchema);
  }
};
