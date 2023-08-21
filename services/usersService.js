const { faker } = require("@faker-js/faker");

/**
 * This class is used to separate the logic of the users.js file.
 * It is used to get all the users, get a user by id, create a user, update a user, delete a user.
 * It uses an empty array in the constructor that, for the moment, works as a database.
 * 
 * @class UsersService
 * @property {Array}
 * 
 */
class UsersService {
    constructor() {
        this.users = [];
        // this.generate();
    }

    // This method is used to generate fake data. It can be called in the class constructor to populate the array with 100 registers
    generate() {
        const limit = 100
        for (let i = 0; i < limit; i++) {
            this.users.push({
                id: i,
                userName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                userEmail: faker.internet.email(),
                userPassword: "Contaseña123@"
            });
        }
    }
    

    getAllUsers() {
        
        if (this.users.length == 0) {
            return "No hay usuarios registrados"
        }
        return this.users;
    }

    getUserById(userId) {
        return this.users.find(user => user.id === parseInt(userId))
    }
}

module.exports = UsersService;