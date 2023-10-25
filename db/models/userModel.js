const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    firstName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'first_name',
        length: 80
    },
    lastName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'last_name',
        length: 80
    },
    //No olvidar comentar este campo cuando vaya a hacer modificaciones a la tabla de usuarios.
    fullName: {
        type: DataTypes.VIRTUAL,
        get() {
            return firstName + ' ' + lastName;
        }   
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        field: 'user_email'
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING,
        length: 50
    },
    isAdmin: {
        defaultValue: false,
        type: DataTypes.BOOLEAN,
        field: 'is_admin'
    },
    isActive: {
        defaultValue: true,
        type: DataTypes.BOOLEAN,
        field: 'is_active'
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
    }
}

class User extends Model {
    static associate() {
        // Modelos que se relacionan con este modelo
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: false
        }
    }
}

module.exports = { USER_TABLE, UserSchema, User };