const Sequelize = require('sequelize');

// Creates the database called Stock Tender
const sequelize = new Sequelize({
  database: 'Stock Tender',
  username: 'snickerdoodle',
  password: null,
  host: 'localhost',
  dialect: 'postgres' // explicitly state which DB software you are using
});
// Models are defined with sequelize.define('name', {attributes}, {options}).
// creates the users table
let usersTable = sequelize.define('users', {
  username: { type: Sequelize.STRING, unique: true },
  password: { type: Sequelize.STRING },
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }
});
// creates the items / ingredients table
let itemsTable = sequelize.define('items/ingredients', {
  brandName: { type: Sequelize.STRING },
  units: { type: Sequelize.INTEGER },
  liquid: { type: Sequelize.BOOLEAN },
  class: { type: Sequelize.STRING },
  type: { type: Sequelize.STRING }
});

itemsTable.belongsTo(usersTable);

const addItemEntry = (req, res) => {};

const deleteItemEntry = (req, res) => {};

const editItem = (req, res) => {};

const showRecipes = (req, res) => {};

const showStock = (req, res) => {};

// sequelize.sync({ logging: console.log }).then(() => {});
// You can use the .authenticate() function like this to test the connection.
sequelize
  .authenticate()
  .then(() => {
    console.log('****** Connection has been established successfully ******');
  })
  .catch(err => {
    console.error('****** Unable to connect to the database:', err);
  });

module.exports = {
  createUser: function(req, res) {
    usersTable.create(
      {
        username: req.body.username,
        password: req.body.password
      },
      (err, userEntry) => {
        if (err) return res.status(404).json({ errorMsg: 'Status code 404' });
        // console.log('This is the userEntry: ', userEntry);
        // res.json(userEntry);
      }
    );
  }
};
