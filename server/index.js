const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const authMiddleware = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', authMiddleware, taskRoutes); // protected

app.get('/', (req, res) => {
  res.json({ message: 'Study Planner API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
