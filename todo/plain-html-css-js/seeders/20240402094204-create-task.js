'use strict';

const { Sequelize, DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.bulkInsert('Tasks', [{

    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // }], {});
    await Tasks.create({
      name: 'Task 2',
      status: 'open',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tasks', null, {});
  }
};
