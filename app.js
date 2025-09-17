const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || "producation"
app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Node.js App!',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV
  });
});

app.get('/test', (req, res) => {
  res.json({
    message: 'Hello from Node.js App testing api!',
    timestamp: new Date().toISOString()
  });
});

app.get('/test-v1', (req, res) => {
  res.json({
    message: 'Hello from Node.js App testing api!',
    timestamp: new Date().toISOString()
  });
});
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    uptime: process.uptime(),
    environment: NODE_ENV
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`App running on port ${port} in ${NODE_ENV} mode`);
});

