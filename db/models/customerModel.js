const { Model, DataTypes, Sequelize } = require('sequelize');

const CUSTOMER_TABLE = 'customers';
const { USER_TABLE } = require('./userModel');

const CustomerSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    firstName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'first_name'
    },
    lastName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'last_name'
    },
    phone: {
        allowNull: false,
        type: DataTypes.STRING
    },
    isActive: {
        defaultValue: true,
        type: DataTypes.BOOLEAN,
        field: 'is_active'
    },
    userId: {
        field: 'user_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            table: USER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
    }
}

class Customer extends Model
{
    static associate(models) {
        // Modelos relacionados
        this.belongsTo(models.User, {as: 'user'})
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: CUSTOMER_TABLE,
            modelName: 'Customer',
            timestamps: true
        }
    }
}

module.exports = { CUSTOMER_TABLE, CustomerSchema, Customer };