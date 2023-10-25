const boom = require("@hapi/boom");

const { models } = require("../libs/sequelize");

class CustomerService
{
    constructor() {}

    async getAllCustomers()
    {
        const customers = await models.Customer.findAll();
        if (customers.length === 0) {
            throw boom.notFound("No customers found");
        }

        return customers;
    }

    async getCustomer(id)
    {
        const customer = await models.Customer.findByPk(id);
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
        return "Hola mundo";
    }

    async updateCustomer(id, changes)
    {
        const customer = await this.getCustomer(id);
        
        const updatedCustomer = await customer.update(changes);
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