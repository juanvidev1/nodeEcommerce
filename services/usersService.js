const { faker } = require("@faker-js/faker");
const boom = require("@hapi/boom");

const { models } = require("../libs/sequelize");

class UsersService {
    constructor() {}

    
    async getAllUsers() {
      const res = await models.User.findAll();
      if (res.length === 0) {
        throw boom.notFound('No se encontraron usuarios');
      }
      return res;
    }

    getUserById(userId) {
        const user =  this.users.find(user => user.id === parseInt(userId))
        if (!user) {
          throw boom.notFound('Usuario no encontrado');
        }
        if (user.active === false) {
            throw boom.conflict('Usuario bloqueado');
        }

        return user;
    }

    async createUser(userData) {
      try {
        const newUser = await models.User.create(userData);
        return newUser;
      } catch (error) {
        throw boom.badRequest(error);
      }
    }

    async updateUser(userId, userData) {
      const user = await models.User.findByPk(userId);
      if (!user) {
        throw boom.notFound('Usuario no encontrado');
      } 

      const res = await models.User.update(userData);

      return res;
    }

    deleteUser(id) {
      const index = this.users.findIndex(item => item.id === parseInt(id));
      if (index === -1) {
        throw boom.notFound('Usuario no encontrado');
      }

      this.users.splice(index, 1);
      return { id };
    }
}

module.exports = UsersService;
