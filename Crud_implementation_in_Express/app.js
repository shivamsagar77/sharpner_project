// app.js

const express = require('express');
const app = express();
const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoutes');

// Home Route
app.get('/', (req, res) => {
  res.send("Welcome to the Student & Course Portal API!");
});

// Student Routes
app.use('/students', studentRoutes);

// Course Routes
app.use('/courses', courseRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// Server Start
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
