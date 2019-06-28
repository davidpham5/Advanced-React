// Start up node server
require('dotenv').config({
  path: '.env'
});

const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

// TODO use express middleware to handle cookies
// TODO use express middleware to populate current user

server.start({
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL
  }
}, (success) => {
  console.log(`Server is now running on http://localhost:${success.port}`);
});
