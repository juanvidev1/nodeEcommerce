const boom = require('@hapi/boom');
const OrdersService = require('./ordersService');

const { models } = require("../libs/sequelize");

const ordersService = new OrdersService();

class OrderProductService {
    constructor () {}

    async create(data) {
        const newItem = await models.OrderProduct.create(data);
        return newItem;        
    }

    async findOne(id) {
        const item = await models.OrderProduct.findByPk(id, {
            include: ['order', 'product']
        });
        if (!item) {
            throw boom.notFound('OrderProduct not found');
        }
        return item;
    }

    async calculateTotalPrice (orderId) {
        try {
            const orderProduct = await models.OrderProduct.findAll({
                where: { orderId },
                include: {
                  model: models.Product,
                  as: 'product',
                },
              });
            const totalPrice = orderProduct.reduce((total, orderProduct) => {
                return total + orderProduct.product.price * orderProduct.amount;
            }, 0);
            console.log('Este es el precio total generado: ' + totalPrice);
            return totalPrice;
                    
        } catch (error) {
            throw boom.badRequest(error);
        }
    }

    async updateOrderTotalPrice(id, totalPrice) {
        try {
            const order = await ordersService.findOrderById(id);
            order.totalPrice = totalPrice;
            await order.save();
        } catch (error) {
            throw boom.badRequest(error);
        }
    }
    
}

module.exports = OrderProductService;