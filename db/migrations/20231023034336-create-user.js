'use strict';

const { UserSchema, USER_TABLE } = require('./../models/userModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * This method allows to create the table User
   */
  async up (queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
  },

  /**
   * This method allows to rollback the changes made by this migration
   */
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_TABLE);
  }
};
