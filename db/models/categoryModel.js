const { Model, DataTypes, Sequelize } = require('sequelize');

const CATEGORY_TABLE = 'categories';

const CategorySchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'category_name',
        length: 120
    },
    description: {
        allowNull: true,
        type: DataTypes.TEXT,
        field: 'description'
    },
    image: {
        allowNull: true,
        type: DataTypes.STRING,
        field: 'category_image'
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
    }
}

class Category extends Model {
    static associate(models) {
        // Aquí van las relaciones
        this.hasMany(models.Product, {
            as: 'products', 
            foreignKey: 'categoryId'
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: CATEGORY_TABLE,
            modelName: 'Category',
            timestamps: false
        }
    }
}

module.exports = { CATEGORY_TABLE, CategorySchema, Category };