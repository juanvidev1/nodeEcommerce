const boom = require("@hapi/boom");

const { models } = require("../libs/sequelize");

class CustomerService
{
    constructor() {}

    async getAllCustomers()
    {
        const customers = await models.Customer.findAll({
            include: ["user"] // Como se pueden tener varias asociaciones, el include se pasa como un array
        });
        if (customers.length === 0) {
            throw boom.notFound("No customers found");
        }

        return customers;
    }

    async getCustomer(id)
    {
        const customer = await models.Customer.findByPk(id, {
            include: ["user"]
        });
        if (!customer) {
            throw boom.notFound("Customer not found");
        }

        if (customer.active === false) {
            throw boom.conflict("Customer is inactive");
        }

        return customer;
    }
    
    async createCustomer(data)
    {
        const newCustomer = await models.Customer.create(data, {
            include: ["user"]
        });
        return newCustomer;
    }

    async updateCustomer(id, changes)
    {
        const customer = await this.getCustomer(id);
        console.log('Customer encontrado ' + customer.id);
        console.log('Cambios a aplicar ' + changes.body);
        const updatedCustomer = await customer.update(changes, {
            include: ["user"]
        });
        return updatedCustomer;
    }

    async deleteCustomer(id)
    {
        const customer = await this.getCustomer(id);
        await customer.destroy();
        return { id };
    }
}

module.exports = CustomerService;