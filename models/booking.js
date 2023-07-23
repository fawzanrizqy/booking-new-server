'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'nama_booking' });
      this.belongsTo(models.Ruang, { foreignKey: 'id_ruang' });
    }
  }
  Booking.init({
    tgl_booking: DataTypes.DATE,
    nama_booking: DataTypes.INTEGER,
    shift_mulai: DataTypes.TIME,
    shift_selesai: DataTypes.TIME,
    id_ruang: DataTypes.INTEGER,
    keperluan: DataTypes.STRING,
    status: DataTypes.STRING,
    alasan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};