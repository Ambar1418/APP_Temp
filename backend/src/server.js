require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const seedInitialData = require('./seed/seedData');
const competitionRoutes = require('./routes/competitionRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/competitions', competitionRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'Feedants Competition API', timestamp: new Date() });
});

// Start Server & Connect DB
const startServer = async () => {
  await connectDB();
  await seedInitialData();

  app.listen(PORT, () => {
    console.log(`[Feedants API] Server running on port ${PORT}`);
    console.log(`[Feedants API] Endpoint: http://localhost:${PORT}/api/competitions/feedants-dance-101`);
  });
};

startServer();
