// routes/users.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Create or get existing user
router.post('/', async (req, res) => {
  try {
    const { username, cellphone_number } = req.body;
    
    // Check if user exists
    const [existingUser] = await db.query(
      'SELECT id FROM users WHERE cellphone_number = ?', 
      [cellphone_number]
    );
    
    if (existingUser.length > 0) {
      return res.json(existingUser[0]);
    }
    
    // Create new user
    const [result] = await db.query(
      'INSERT INTO users (username, cellphone_number) VALUES (?, ?)',
      [username, cellphone_number]
    );
    
    res.json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;