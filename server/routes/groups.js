const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => {
  try {
    const { owner_id, groupname } = req.body;
    const [result] = await db.query(
      'INSERT INTO `groups` (owner_id, groupname) VALUES (?, ?)',
      [owner_id, groupname]
    );
    res.json({ id: result.insertId, groupname });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;