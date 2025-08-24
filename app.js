const express = require('express');
const path = require('path');

// cPanel will provide the port number via the environment
const port = process.env.PORT || 3000;
const app = express();

// The 'dist' folder is the output of the 'npm run build' command.
// This line tells our server to serve all static files from that folder.
app.use(express.static(path.join(__dirname, 'dist')));

// This is a catch-all route. For any request that doesn't match a static file
// in the 'dist' folder, it sends back the main index.html file.
// This is crucial for client-side routing to work correctly.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

