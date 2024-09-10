const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

//defining the mongoDB URL
const mongoDbUrl = process.env.MONGODBURL;

mongoose.connect(mongoDbUrl)
.then(() =>{
  console.log("connection successfully done with the MongoDb database")
})
.catch((error) =>{
  console.log('Connection failed' , error)
})

const db = mongoose.connection;

db.on('disconnected' , () =>{
  console.log('Connection is disconnected, please restart your server');
})

module.exports = db;