'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Test DB connection
sequelize
  .authenticate()
  .then(() => console.log('Database connected.'))
  .catch((err) => console.error('Unable to connect to DB:', err));

// Optionally sync models (uncomment if not using migrations)
// sequelize
//   .sync({ alter: true })
//   .then(() => console.log('Models synced to DB'))
//   .catch((err) => console.error('Sync error:', err));

// Mount routes
const programsRouter = require('./routes/programs');
app.use('/api/programs', programsRouter);

const metadataRouter = require('./routes/metadata');
app.use('/api/metadata', metadataRouter);

// Health check
app.get('/', (req, res) => res.send('CS Programs API is up.'));

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
