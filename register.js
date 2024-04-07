// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Set up express app
const app = express();
const port = 3000;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Define User schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

// Define User model
const User = mongoose.model('User', userSchema);

// Handle POST request to /register
app.post('/register', (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    newUser.save((err, user) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error registering user');
        } else {
            console.log('User registered successfully:', user);
            res.status(200).send('User registered successfully');
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
