require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectWithDB = require('./config/db');
const cloudinary = require('cloudinary').v2;

// connect with database
connectWithDB();

// cloudinary configuration
cloudinary.config({
  cloud_name:"diggz6mzu" ,
  api_key:"464972273221842",
  api_secret:"vRAWOh9tAPKYbBEN7AazPyF4aTo"
});

const app = express();

// middleware to handle json
app.use(express.json());

app.use(cors());

// use express router
app.use('/', require('./routes'));


app.listen(8000, (err) => {
  if (err) {
    console.log('Error in connecting to server: ', err);
  }
  
});

module.exports = app;
