"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    return queryInterface.bulkInsert("Mobils", [
      {
        name: "Avanza",
        price: "20000",
        type: "Large",
        image: "http://res.cloudinary.com/dzzvhocib/image/upload/v1665067586/test/nm7janmln0nxkngfb5rt.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Toyota",
        price: "20000",
        type: "small",
        image: "http://res.cloudinary.com/dzzvhocib/image/upload/v1665067586/test/nm7janmln0nxkngfb5rt.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
