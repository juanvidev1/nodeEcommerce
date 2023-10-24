'use strict';

const { USER_TABLE, UserSchema } = require('./../models/userModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(USER_TABLE, 'created_at', UserSchema.createdAt);
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(USER_TABLE, 'created_at');
  }
};
