const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');
const bcrypt = require('bcryptjs');
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

// passport login
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // passwords match!
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect password' });
        }
      });
    });
  })
);
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});
// Routers
const signUp = require('./routes/signUp');

const admin = require('./routes/admin');
app.get('/', (req, res, next) => {
  console.log(req.user);
  console.log('homepage served');
  res.render('home', { user: req.user });
});
app.use('/sign-up', signUp);
app.get('/login', (req, res, next) => {
  res.render('login');
});
app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/sign-up',
  })
);
app.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

app.use('/admin', admin);
//Server
const PORT = process.env.PORT || 4040;
connectDB().then(() => {
  var server = app.listen(PORT, () => {
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
