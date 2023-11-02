const boom = require('@hapi/boom');

const { models } = require("../libs/sequelize");

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
    
}

module.exports = OrderProductService;