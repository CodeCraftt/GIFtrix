const express = require('express');
const connectDB = require('./config/db');
const cors=require('cors');
const path=require('path');
require('./config/env');

const gifRoutes = require('./routes/gifRoutes');

const app = express();

app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/gifs', gifRoutes);

// Placeholder route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
