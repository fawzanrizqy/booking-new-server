'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tgl_booking: {
        type: Sequelize.DATE
      },
      nama_booking: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      shift_mulai: {
        type: Sequelize.TIME
      },
      shift_selesai: {
        type: Sequelize.TIME
      },
      id_ruang: {
        type: Sequelize.INTEGER
      },
      keperluan: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      alasan: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  }
};