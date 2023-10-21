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

    createUser(userData) {
      try {
        const newUser = {
          id: this.users.length + 1,
          ...userData
        }
        this.users.push(newUser);
        return newUser;
        } catch (error) {
          throw boom.badRequest(error);
        }
    }

    updateUser(userId, userData) {
      const index = this.users.findIndex(item => item.id === parseInt(userId));
      if (index === -1) {
         throw boom.notFound('Usuario no encontrado');
      }

      const user = this.users[index];

      this.users[index] = {
        ...user,
        ...userData
      }
      // this.users[user] = userData;
      return this.users[index];
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
