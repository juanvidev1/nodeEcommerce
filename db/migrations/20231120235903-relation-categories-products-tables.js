'use strict';

const { CATEGORY_TABLE } = require('../models/categoryModel');
const { ProductSchema, PRODUCT_TABLE } = require('../models/productModel');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Primero se crea la columna category_id en la tabla products
    queryInterface.addColumn(PRODUCT_TABLE, 'category_id', ProductSchema.categoryId);
    // Luego se crea la relacion entre las tablas category y products
    queryInterface.addConstraint(PRODUCT_TABLE, {
      fields: ['category_id'],
      type: 'foreign key',
      references: {
        table: CATEGORY_TABLE,
        field: 'id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    // Para remover se quita primera la relación
    queryInterface.removeConstraint(PRODUCT_TABLE, {
      fields: ['category_id'],
      type: 'foreign key',
      references: {
        table: CATEGORY_TABLE,
        field: 'id'
      }
    });
    // Y luego se remueve la columna category_id de la tabla products
    queryInterface.removeColumn(PRODUCT_TABLE, 'category_id');
  }
};
