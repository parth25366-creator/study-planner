const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/tasks
router.get('/', async (req, res) => {
  try {
    const userId = req.user.userId;
    const result = await pool.query(
      'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/tasks - create a new task
router.post('/', async (req, res) => {
  try {
    const userId = req.user.userId;
    const { title, course, due_date, priority } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });
    // TODO: insert into DB
    res.status(201).json({ message: 'POST tasks hit' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
