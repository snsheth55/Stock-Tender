const main = require('./postgreSQL-main.js');

const databaseController = {
  // $<= Create =>$ //
  // Creates a user entry in the usersTable //
  createUserEntry: function(req, res) {
    main.usersTable.create(
      {
        username: req.body.username,
        password: req.body.password
      },
      err => {
        if (err) return res.status(404).json({ errorMsg: 'Status code 404' });
      }
    );
  },

  // Creates a entry in the recipes table
  createRecipe: function(req, res) {
    main.recipesTable.create(
      {
        name: req.body.name,
        type: req.body.type
      },
      err => {
        if (err) return res.status(404).json({ errorMsg: 'Status code 404' });
      }
    );
  },
  // Creates recipe ingredients that the recipe contains
  createRecipeIngredientEntry: function(req, res) {
    main.recipeIngredients.create(
      {
        unitQuantity: req.body.unitQuantity,
        recipeId: req.body.recipeId,
        itemId: req.body.itemId
      },
      err => {
        if (err) return res.status(404).json({ errorMsg: 'Status code 404' });
      }
    );
  },

  // Creates a entry in the items/ingredient table
  addItemEntry: function(req, res) {
    main.itemsTable.create(
      {
        brandName: req.body.brandName,
        // liquid: req.body.liquid,
        // class: req.body.class,
        type: req.body.type
      },
      err => {
        if (err) return res.status(404).json({ errorMsg: 'Status code 404' });
      }
    );
  },

  // way of getting the userId and itemId from the request could change based on front-end.
  // Updates and creates a new item entry
  userBuysItem: function(req, res) {
    main.usersItems
      .findOne({
        where: {
          userId: req.body.userId,
          itemId: req.body.itemId
        }
      })
      .then(userItem => {
        // console.log(userItem);
        if (userItem) {
          userItem
            .updateAttributes(
              {
                quantity: userItem.quantity + req.body.quantity
              },
              err => {
                if (err)
                  return res.status(404).json({ errorMsg: 'Status code 404' });
              }
            )
            .then(newUserItem => {
              // for (key in newUserItem) {
              //   // console.log(key);
              // console.log(newUserItem.dataValues);
              // return res.json(newUserItem.dataValues);
              return newUserItem.dataValues;
            });
        } else {
          main.usersItems
            .create(
              {
                userId: req.body.userId,
                itemId: req.body.itemId,
                quantity: req.body.quantity
              },
              err => {
                if (err)
                  return res.status(404).json({ errorMsg: 'Status code 404' });
              }
            )
            .then(newUserItem => {
              return newUserItem.dataValues;
            });
        }
      })
      .catch(error => {
        res.status(400).send({ error });
      });
  },
  // $<= READ =>$ //
  // Reads the table and gives back a array of objects in a formatted object //
  userViewStock: function(req, res) {
    console.log("INSIDE THE THE USERVIEWSTOCK")
    main.usersItems
      .findAll({
        where: { userId: req.body.userId },
        include: [{ model: main.itemsTable, as: main.itemId }]
      })
      .then(results => {
        // results is in the form of a array of objects with a bunch of nested properties. Use a for loop to a for in loop to access the properties
        let resultArr = [];
        for (let i = 0; i < results.length; i++) {
          let structuredObj = {};
          let {
            quantity,
            item: {
              dataValues: { brandName, type }
            }
          } = results[i];
          structuredObj = { quantity, brandName, type };
          resultArr.push(structuredObj);
        }
        console.log(resultArr);
        res.json(resultArr);
      })
      .catch(error => {
        res.status(400).send({ error });
      });
  },
  deleteUser: function(req, res) {
    main.usersTable
      .destroy({
        where: { id: req.body.userId },
        include: [{ model: main.usersItems, as: 'userId' }]
      })
      .then(results => {
        return 'User successfully deleted';
      })
      .catch(error => {
        res.status(400).send({ error });
      });
  },
  deleteUserItem: function(req, res) {
    main.usersItems
      .destroy({
        where: { userId: req.body.userId, itemId: req.body.itemId }
      })
      .then(results => {
        return 'Item successfully deleted';
      })
      .catch(error => {
        res.status(400).send({ error });
      });
  },
  userMakesRecipe: function(req, res) {
    // main.usersItems
    //   .findAll({
    //     where: {
    //       recipeId: req.body.recipeId
    //     }
    // where: { userId: req.body.userId },
    // include: [
    //   { model: main.users, as: main.username },
    //   { model: main.itemsTable, as: main.nameBrand, as: main.type },
    //   {
    //     model: main.recipeIngredients,
    //     as: main.itemId,
    //     as: main.unitQuantity
    //   }
    // ],
    // })
    // .updateAttributes({
    //   quantity: userItem.quantity - recipeIngredients.quantity
    // })
    // .then(userItems => {
    //   console.log(userItems);
    // })
    // .catch(err => {
    //   console.log(err);
    // });
    main.sequelize
      .query(
        `select ui."id", ui.quantity, ri."unitQuantity" from "userItems" ui inner join "recipeIngredients" ri on ui."itemId"=ri."itemId" where ui."userId"=${
          req.body.userId
        } and ri."recipeId"=${req.body.recipeId};`
      )
      .spread((results, metadata) => {
        results.forEach(row => {
          const newQuantity = row.quantity - row.unitQuantity;
          main.sequelize.query(
            `update "userItems" set quantity = ${newQuantity} where id=${
              row.id
            }`
          );
        });
      });
  }
};

// databaseController.createUserEntry({
//   body: { username: 'Keebler', password: 'elf' }
// });
// databaseController.createUserEntry({
//   body: { username: 'Chips', password: 'ahoy' }
// });
// databaseController.createUserEntry({
//   body: { username: 'Doodle', password: 'snicker' }
// });

// # Created when it should be invalid
// databaseController.createUserEntry({
//   body: { username: '', password: 'test1' }
// });
// databaseController.createUserEntry({
//   body: { username: 'test2', password: '' }
// });
// #

// # Does not create. Working as intended
// databaseController.createUserEntry({
//   body: { password: 'test1' }
// });
// databaseController.createUserEntry({
//   body: { username: 'test2' }
// });
// #

// databaseController.addItemEntry({
//   body: {
//     brandName: 'Grey Goose',
//     type: 'vodka'
//   }
// });
// databaseController.addItemEntry({
//   body: {
//     brandName: "Tito's",
//     type: 'rum'
//   }
// });
// databaseController.addItemEntry({
//   body: {
//     brandName: 'Olives',
//     type: 'garnish'
//   }
// });

databaseController.userBuysItem({
  body: {
    userId: 2,
    itemId: 3,
    quantity: 100
  }
});
databaseController.userBuysItem({
  body: {
    userId: 2,
    itemId: 2,
    quantity: 100
  }
});
databaseController.userBuysItem({
  body: {
    userId: 2,
    itemId: 1,
    quantity: 100
  }
});

// databaseController.userViewStock({ body: { userId: 1 } });

// databaseController.deleteUser({ body: { userId: 9 } });
// databaseController.deleteUserItem({
//   body: { userId: 11, itemId: 1 }
// });

// databaseController.createRecipe({
//   body: {
//     name: 'Large Health Potion',
//     type: 'Restorative'
//   }
// });
// databaseController.createRecipe({
//   body: {
//     name: 'Large Mana Potion',
//     type: 'Restorative'
//   }
// });
// databaseController.createRecipe({
//   body: {
//     name: 'Potion of fortitude',
//     type: 'Buff'
//   }
// });

// main.recipeIngredients.create({
//   recipeId: 1,
//   itemId: 3,
//   unitQuantity: 50
// });
// main.recipeIngredients.create({
//   recipeId: 1,
//   itemId: 1,
//   unitQuantity: 100
// });

// databaseController.createRecipeIngredientEntry({
//   body: {
//     unitQuantity: 50,
//     recipeId: 2,
//     itemId: 1
//   }
// });

// databaseController.createRecipeIngredientEntry({
//   body: {
//     unitQuantity: 50,
//     recipeId: 2,
//     itemId: 2
//   }
// });

// main.itemsTable.hasMany(main.recipeIngredients);
// main.sequelize.sync();

// databaseController.userMakesRecipe({ body: { userId: 1, recipeId: 1 } });

module.exports = databaseController;

// deleteItemEntry: function(req, res) {

// },
