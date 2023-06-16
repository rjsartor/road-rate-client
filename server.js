const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'build' directory
app.use(express.static(path.resolve(__dirname, 'build')));

// Serve the 'index.html' file for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.info(`Server listening on port ${port}`);
});