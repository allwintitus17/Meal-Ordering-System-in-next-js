const express = require('express');
const PORT = 5000;
const app = express();
require('./config/db.js');
const cors = require('cors');

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/meals', require('./routes/mealsdata'));

// Server listening
app.listen(PORT, () => {
  console.log(`Server running on port number ${PORT}`);
});
