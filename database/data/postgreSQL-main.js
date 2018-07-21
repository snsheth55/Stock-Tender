const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'postgreSQL-main',
  /*Username, */ /*password, */ {
    host: 'localhost',
    dialect: 'postgres'
  }
);

sequelize.sync({ logging: console.log }).then(() => {});

module.exports = function(data) {
  //
  //
};
