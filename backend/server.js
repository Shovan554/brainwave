require('dotenv').config(); // Add this line at the top of your file

const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const app = express();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; 

// Middleware
app.use(cors()); // Enable CORS to allow requests from React frontend
app.use(express.json()); // Parse incoming JSON request bodies

// PostgreSQL Pool setup (adjust credentials)
const pool = new Pool({
  user: 'shovan', 
  host: 'localhost', 
  database: 'brainwave', 
  password: '', 
  port: 5432, 
});

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ success: false, message: 'Invalid token.' });
    req.user = user; // Attach the decoded user information to the request object
    next();
  });
};

// Signup route
app.post('/signup', async (req, res) => {
  const { fullName, username, email, password } = req.body;

  try {
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const validPassword = await bcrypt.compare(password, user.password);

      if (validPassword) {
        // Generate a token with the user's ID and full name
        const token = jwt.sign(
          { user_id: user.id, full_name: user.full_name },
          JWT_SECRET,
          { expiresIn: '1h' }
        );
        res.status(200).json({ success: true, message: 'Login successful', token });
      } else {
        res.status(400).json({ success: false, message: 'Invalid email or password' });
      }
    } else {
      res.status(400).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Protected route example
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: `Hello, ${req.user.full_name}! This is a protected route.` });
});

// Run the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
