const mongoose = require('mongoose');
require('dotenv').config({path : './src/.env'});

console.log(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI).then(
    () => {console.log("Connected to database!");},
    err => {
      console.log(err);
    });