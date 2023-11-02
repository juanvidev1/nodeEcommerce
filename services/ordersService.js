const boom = require("@hapi/boom");

const { models } = require("../libs/sequelize");

class OrdersService {
    constructor() {}

    async findOrder() {
        return await models.Order.findAll({
            include: ['customer']
        })
    }

    async createOrder(data) {
        return await models.Order.create(data)
    }

    async findOrderById(id) {
        const order = await models.Order.findByPk(id, {
            include: [
                {
                    association: 'customer',
                    include: ['user']
                },
                {
                    association: 'items'
                }
            ]
        });
        if (!order) {
            throw boom.notFound('No se encontró la orden con ese id');
        }
        return order;
    }

    async updateOrder(id, changes) {
        const order = await this.findOrderById(id);
        const res = await order.update(changes);
        return res;
    }

    async updateOrderStatus(id, changes) {
        const order = await this.findOrderById(id);
        const res = await order.update(changes);
        return res;
    }

    async updateTotalPrice(id, changes) {
        try {
            const order = await this.findOrderById(id);
            const res = await order.update(changes.totalPrice);
            return res;
        } catch (error) {
            throw boom.badRequest(error);
        }
    }

    async deleteOrder(id) {
        const order = await this.findOrderById(id);
        await order.destroy();
        return { id };
    }
}

module.exports = OrdersService;