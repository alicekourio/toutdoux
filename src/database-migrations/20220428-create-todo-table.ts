export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'todo',
      {
        id: {
          type: Sequelize.STRING(14),
          primaryKey: true,
        },

        title: Sequelize.STRING,
        completed: {},
        // name: Sequelize.STRING,
        // address: Sequelize.STRING,
        // city: Sequelize.STRING,
        // zipcode: Sequelize.STRING(10),
        // country: Sequelize.STRING(2),
        // vat: Sequelize.STRING(10),
        // currency: Sequelize.STRING(3),
        // is_verified: {
        //   type: Sequelize.BOOLEAN,
        //   defaultValue: false,
        // },
        // created_at: Sequelize.DATE,
        // updated_at: Sequelize.DATE,
        // deleted_at: {
        //   type: Sequelize.DATE,
        //   defaultValue: null,
        //   allowNull: true,
        // },
      },
      { charset: 'utf8' }
    );
  },
  async down(queryInterface) {
    await queryInterface.dropTable('companies');
  },
};
