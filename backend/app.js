  const express = require("express");
  const cors = require("cors");
  const app = express();
  const feedbackRoutes = require("./routes/feedbackRoutes");
  const { pool } = require("./config/db"); // ✅ Import DB pool
  const demopost = require("./routes/demoPost"); // Import demoPost routes
  // const bus_booking_app = require('./routes/bus_booking_app');
  // const bus_system = require('./routes/busRoutes');
  // const student_system = require('./routes/studentRoutes');
  const signup = require('./routes/signup')
  // Middleware
  app.use(cors());
  app.use(express.json()); // Parse incoming JSON

  // Routes
  app.use("/api/feedback", feedbackRoutes); // Mount feedback routes
  app.use("/api/demopost",demopost) // Fallback for /api/post
  
  // Root route (should be before listen for consistency)
  app.get("/", (req, res) => {
    res.send("Welcome to the Feedback API");
  });

  // app.use("/api/bus_booking/create_user",bus_booking_app);
  // app.use("/api/bus_booking/bus_system",bus_system)
  // app.use("/api/student_system",student_system)
app.use("/signup",signup)
  // ✅ Set correct PORT (5000, not 500)
  const PORT = 5000;

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });

  module.exports = app;
