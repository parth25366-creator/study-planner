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

// POST /api/tasks
router.post('/', async (req, res) => {
  try {
    const userId = req.user.userId;
    const { title, course, due_date, priority } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });

    const result = await pool.query(
      'INSERT INTO tasks (user_id, title, course, due_date, priority) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [userId, title, course, due_date, priority || 'medium']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
