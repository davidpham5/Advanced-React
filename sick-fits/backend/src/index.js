const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
// Start up node server
require('dotenv').config({
  path: '.env'
});

const createServer = require('./createServer');

const db = require('./db');

const server = createServer();
server.express.use(cookieParser());

// decode the JWT (json web token), so we can get user id, on each request.
server.express.use((req, res, next) => {
  const {token} = req.cookies;
  // decode that token
  if (token) {
    const {userId} = jwt.verify(token, process.env.APP_SECRET)
    // put the userid onto the request future requests to access
    req.userId = userId;
  }
  next();
})

server.start({
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL
  }
}, (success) => {
  console.log(`Server is now running on http://localhost:${success.port}`);
});
