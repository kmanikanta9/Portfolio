require('dotenv').config(); // Load .env first
const express = require('express');
const cors = require('cors');
const connectToDB = require('./configs/db');
const contactRouter = require('./routes/contactRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectToDB();

// Port
const PORT = process.env.PORT || 5000;

// Test route
// Test route for local development
app.get('/test', (req, res) => {
  res.status(200).json({ 
    message: '✅ Local Test Route is Working', 
    timestamp: new Date().toISOString() 
  });
});

// Contact routes
app.use('/contact', contactRouter);



// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: '404, Route is not found....' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
