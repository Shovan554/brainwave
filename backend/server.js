// server.js
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();

// Middleware
app.use(cors()); // Enable CORS to allow requests from React frontend
app.use(express.json()); // Parse incoming JSON request bodies

// PostgreSQL Pool setup (adjust credentials)
const pool = new Pool({
  user: 'shovan', // Your PostgreSQL user
  host: 'localhost', // Your PostgreSQL host
  database: 'brainwave', // Your PostgreSQL database
  password: '', // Your PostgreSQL password
  port: 5432, // Your PostgreSQL port
});

// Signup route
app.post('/signup', async (req, res) => {
  const { fullName, username, email, password } = req.body;

  try {
    // Check if the user already exists
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    const newUser = await pool.query(
      'INSERT INTO users (full_name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [fullName, username, email, hashedPassword]
    );

    res.status(201).json({ success: true, message: 'User created', user: newUser.rows[0] });
  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Query the database for the user by email
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length > 0) {
      const user = result.rows[0];

      // Compare the provided password with the stored hashed password
      const validPassword = await bcrypt.compare(password, user.password);

      if (validPassword) {
        // Successful login
        res.status(200).json({ success: true, message: 'Login successful', user });
      } else {
        // Invalid password
        res.status(400).json({ success: false, message: 'Invalid email or password' });
      }
    } else {
      // User not found
      res.status(400).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Run the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
