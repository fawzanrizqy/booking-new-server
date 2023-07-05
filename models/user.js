'use strict';
const { hashPass } = require('../helpers/encryptor')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Booking, { foreignKey: 'nama_booking' })
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Name Must be filled!',
        },
        notEmpty: {
          msg: 'Name Must be filled!',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password Must be filled!',
        },
        notEmpty: {
          msg: 'Password Must be filled!',
        },
      },
    },
    role: { //! admin / user
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Role Must be filled!',
        },
        notEmpty: {
          msg: 'Role Must be filled!',
        },
      },
    },
    id_kampus: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'NPK/NIK Must be filled!',
        },
        notEmpty: {
          msg: 'NPK/NIK Must be filled!',
        },
      },
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user, options) => {
    user.password = hashPass(user.password);
  })
  return User;
};