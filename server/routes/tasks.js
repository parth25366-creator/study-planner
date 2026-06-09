const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/tasks - fetch all tasks for logged in user
router.get('/', async (req, res) => {
  try {
    const userId = req.user.userId;
    // TODO: query DB
    res.status(200).json({ message: 'GET tasks hit', userId });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
