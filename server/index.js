const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const revokeRoutes = require('./routes/revokeRoutes');
const config = require('./config.js');

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(config.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(config.PORT, () => {
      console.log(`Server is running on port ${config.PORT}`);
    });
  })
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/auth', authRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/revoke', revokeRoutes);

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});
