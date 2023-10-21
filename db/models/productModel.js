const { Model, DataTypes, Sequelize } = require('sequelize');

const PRODUCT_TABLE = 'products';

const ProductSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
        length: 100,
        field: 'product_name'
    },
    price: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'product_price'
    },
    description: {
        allowNull: true,
        type: DataTypes.STRING,
        length: 200,
        field: 'product_description'
    },
    image: {
        allowNull: true,
        type: DataTypes.STRING,
        length: 255,
        field: 'product_image'
    },
    stock: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'product_stock'
    },
    active: {
        defaultValue: true,
        type: DataTypes.BOOLEAN,
        field: 'product_active'
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'product_created_at',
        defaultValue: Sequelize.NOW
    }
}

class Product extends Model 
{
    static associate() {
        // Modelos que se relacionan con este modelo
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: PRODUCT_TABLE,
            modelName: 'Product',
            timestamps: false
        }
    }
}

module.exports = { PRODUCT_TABLE, ProductSchema, Product }