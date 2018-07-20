const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgresql-orm', 'student', 'ilovetesting', {
  host: 'localhost',
  dialect: 'postgres'
});

// what does the sync method do?
sequelize.sync({ logging: console.log }).then(() => {});

module.exports = function(data) {
  //place code here
};
