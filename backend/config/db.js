const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

// Use the MONGODB_URI from the .env file
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI)
    .then(() => {
        console.log('Database Connected Successfully');
    })
    .catch((error) => {
        console.error('Database connection failed:', error.message);
    });
