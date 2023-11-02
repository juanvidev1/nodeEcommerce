const { Model, DataTypes, Sequelize } = require('sequelize');

const { CUSTOMER_TABLE } = require('./customerModel');
const ORDER_TABLE = 'orders';

const OrderSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    customerId: {
        field: 'customer_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: CUSTOMER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    state: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'created',
        field: 'order_status'
    },
    totalAmount: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'total_amount',
        defaultValue: 0
    },
    paymentMethod: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'payment_method'
    },
    isDeliverable: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        field: 'is_deliverable',
        defaultValue: false
    },
    shippingAddress: {
        type: DataTypes.STRING,
        field: 'shipping_address',
        defaultValue: 'N/A'
    },
    billingAddress: {
        type: DataTypes.STRING,
        field: 'billing_address',
        defaultValue: 'N/A'
    },
    shippingMethod: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'shipping_method',
        defaultValue: 'N/A'
    },
    shippingCost: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'shipping_cost',
        defaultValue: 0
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
    }
}

class Order extends Model {
    static associate(models) {
        this.belongsTo(models.Customer, {as: 'customer'});
        this.belongsToMany(models.Product, {
            through: models.OrderProduct,
            as: 'items',
            foreignKey: 'orderId',
            otherKey: 'productId'
        })
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ORDER_TABLE,
            modelName: 'Order',
            timestamps: false
        }
    }
}

module.exports = { ORDER_TABLE, OrderSchema, Order };