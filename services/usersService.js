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
        const user = models.User.findByPk(userId);
        
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
      const user = await this.getUserById(userId);
      const res = await user.update(userData);

      return res;
    }

    async deleteUser(id) {
      const user = await this.getUserById(id);
      await user.destroy();
      
      return { id };
    }
}

module.exports = UsersService;
