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

    async getUserById(userId) {
        const user = await models.User.findByPk(userId);
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
        return await models.User.create(userData);
      } catch (error) {
        throw boom.badRequest(error);
      }
    }

    async updateUser(userId, userData) {
      const user = await this.getUserById(userId);
      return await user.update(userData);
    }

    async deleteUser(id) {
      const user = await this.getUserById(id);
      return { id };
    }
}

module.exports = UsersService;
