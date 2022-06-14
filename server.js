const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const app = express();

// Load env vars
dotenv.config({ path: './config/config.env' });

// serve static files in /public
app.use(express.static(__dirname + '/public'));

// sets view engine to PUG
app.set('views', './views');
app.set('view engine', 'pug');

// Body Parser
app.use(express.json());

// Routers
app.get('/', (req, res, next) => {
  res.render('home');
});
app.get('/sign-up', (req, res, next) => {
  res.render('sign-up');
});
//Server
const PORT = process.env.PORT || 4040;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(
      ` Server running in ${process.env.NODE_ENV} , App listening on port ${PORT}!`
        .yellow.bold
    );
  });
});
// Handle unhandled promise
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
