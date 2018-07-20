const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const eventController = require('./database/server/eventController');

//** login get user information
app.get('/login', eventController.getUser);

//**  add items to stock
app.post('/addStock', eventController.addItem);

//** get stock table
app.get('/viewStock', eventController.showAllStock);

//** edit individual stock items
app.post('/editStock', eventController.editItem);

//** remove record of item in stock
app.post('/deleteItem', eventController.deleteItem);

//**
app.listen(3000);

module.exports = app;
