const Sequelize = require('sequelize');

// Creates the database called Stock Tender
const sequelize = new Sequelize({
  database: 'Stock Tender',
  username: 'fenrec',
  // password: 'ilikecookies',
  host: 'localhost',
  dialect: 'postgres' // explicitly state which DB software you are using
});

// Models are defined with sequelize.define('name', {attributes}, {options})
// creates the users Schema which defines the column for the table
const usersTable = sequelize.define('users', {
  username: { type: Sequelize.STRING, unique: true, required: true },
  password: { type: Sequelize.STRING, required: true },
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }
});

// creates the items / ingredients Schema
const itemsTable = sequelize.define('items', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  brandName: { type: Sequelize.STRING, required: true },
  liquid: { type: Sequelize.BOOLEAN },
  class: { type: Sequelize.STRING },
  type: { type: Sequelize.STRING }
});

// creates the usersItem Schema which shows what the user can offer based upon their ingredient quantity
const usersItems = sequelize.define('userItems', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  quantity: { type: Sequelize.INTEGER, required: true }
});

// Creates relationships from usersItems to users - items - recipeIngredients
usersItems.belongsTo(usersTable, {
  foreignKey: { field: 'userId', allowNull: false },
  onDelete: 'cascade',
  targetKey: 'id'
});
usersItems.belongsTo(itemsTable, {
  foreignKey: { field: 'itemId', allowNull: false },
  targetKey: 'id'
});

// Creates the recipes Schema which shows all the available recipes by name and type
const recipesTable = sequelize.define('recipes', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: Sequelize.STRING, unique: true, required: true },
  type: { type: Sequelize.STRING } // cocktail, mixed drink, martini
});

// Creates the recipe Ingredients Schema which shows all the ingredients required by the recipe by creating a relationship between recipe and ingredients
const recipeIngredients = sequelize.define('recipeIngredients', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  unitQuantity: { type: Sequelize.INTEGER, required: true }
});

// Creates relationships between recipes - ingredients required for each recipe in the recipeIngredients table
recipeIngredients.belongsTo(recipesTable, {
  foreignKey: 'recipeId',
  targetKey: 'id'
});
recipeIngredients.belongsTo(itemsTable, {
  foreignKey: 'itemId',
  targetKey: 'id'
});
// itemsTable.hasMany(recipeIngredients);

// usersItems.belongsTo(recipeIngredients, {
//   foreignKey: { field: 'itemId', allowNull: false },
//   targetKey: 'itemId'
// });

// Creates the relational table that links between the user and what recipe they are able to make
// const userRecipe = sequelize.define('userRecipe', {
//   id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }
// });

// // Creates relationships between users - recipe
// userRecipe.belongsTo(recipesTable, { foreignKey: 'recipeId', targetKey: 'id' });
// userRecipe.belongsTo(usersTable, { foreignKey: 'userId', targetKey: 'id' });

// Creates all the necessary tables based on Schemas
sequelize.sync();

const deleteItemEntry = (req, res) => {};

const editItem = (req, res) => {};

const showRecipes = (req, res) => {};

const showStock = (req, res) => {};

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
  sequelize,
  usersTable,
  itemsTable,
  usersItems,
  recipesTable,
  recipeIngredients
};

// module.exports = {
//   //Creates a entry in the users table
//   createUserEntry: function(req, res) {
//     usersTable.create(
//       {
//         username: req.body.username,
//         password: req.body.password
//       },
//       err => {
//         if (err) return res.status(404).json({ errorMsg: 'Status code 404' });
//       }
//     );
//   },
//   // Creates a entry in the items/ingredient table
//   addItemEntry: function(req, res) {
//     itemsTable.create(
//       {
//         brandName: req.body.brandName,
//         units: req.body.units,
//         liquid: req.body.liquid,
//         class: req.body.class,
//         type: req.body.type
//       },
//       err => {
//         if (err) return res.status(404).json({ errorMsg: 'Status code 404' });
//       }
//     );
//   },
//   deleteItemEntry: function(req, res) {

//   //);
//   },
// };

// module.export = { createUserEntry, addItemEntry} ;
