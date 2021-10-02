// dependencies
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const app = express();
const db = mongoose.connection;
const logger = require('morgan');

// configure server settings
require('dotenv').config();

// port
const PORT = process.env.PORT || 3000;

// database
const MONGODB_URI = process.env.MONGODB_URI;

// connect to database
mongoose.connect(MONGODB_URI);



// error/success
db.on('error', (err) => console.log(err.message + " is mongodb not working?"));
db.on('connected', () => console.log('mongodb connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongodb disconnected'));

// middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

// routes
app.get('/', (req, res) => {
    res.send('hello world');
});

// listener
app.listen(PORT, () => console.log('express is listening on: ', PORT));
