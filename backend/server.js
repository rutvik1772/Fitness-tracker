require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let workouts = [];

// Home route
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Get all workouts
app.get('/api/workouts', (req, res) => {
  res.json(workouts);
});

// Add new workout
app.post('/api/workouts', (req, res) => {
  const workout = req.body;
  workouts.push(workout);
  res.json({
    success: true,
    message: 'Workout added successfully',
    data: workouts
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});