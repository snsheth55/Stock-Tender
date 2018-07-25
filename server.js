const express = require('express');
const app = express();
const path = require('path');
const main = require('./database/postgreSQL-main.js');
const eventController = require('./database/event-controller-model.js');
const bodyParser = require('body-parser');

app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));

//** login get user information
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + "/client/public/index.html"));
});
app.get('/inventory', eventController.userViewStock);

app.post('/createUser', eventController.createUserEntry);

//**  add items to stock
app.post('/addStock', eventController.addItemEntry);

//** get stock table
app.get('/viewStock', () => {});

//** edit individual stock items
app.post('/editStock', () => {});

//** remove record of item in stock
app.post('/deleteItem', () => {});

//**
app.listen(4000, () => {
  console.log('Listening to port 4000');
});

module.exports = app;
