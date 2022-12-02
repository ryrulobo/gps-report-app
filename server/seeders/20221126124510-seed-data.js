"use strict";
const moment = require("moment");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/gps-data.json");
    data.forEach((el) => {
      el.Timestamp = moment(el.Timestamp, "DD-MM-YYYY hh:mm").toDate();
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Data", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Data", null);
  },
};
