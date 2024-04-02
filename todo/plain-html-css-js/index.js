const express = require('express');
const path = require('path');
const config = require('./config/config.json');
const { Sequelize, DataTypes } = require('sequelize');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const bodyParser = require('body-parser');

const app = express();
const port = 3000;


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

const sequelize = new Sequelize(config.development);

const User = sequelize.define('User', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
function getUserByUsername(username, callback) {
    User.findOne({ where: { username: username } })
    .then(user => callback(null, user))
    .catch(err => callback(err));
}

function getUserById(id, callback) {
    User.findByPk(id)
    .then(user => callback(null, user))
    .catch(err => callback(err));
}

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      // user is not authenticated, redirect to login page
      res.json({ redirect: '/login' });
    }
  }

passport.use(new LocalStrategy(
    function(username, password, done) {
      // Here, you should fetch the user from your database
      // For the sake of this example, let's assume you have a function `getUserByUsername` that does this
      getUserByUsername(username, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
  
        bcrypt.compare(password, user.password, function(err, result) {
          if (result) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    }
  ));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    // Here, you should fetch the user from your database using the id
    // For the sake of this example, let's assume you have a function `getUserById` that does this
    getUserById(id, function(err, user) {
      done(err, user);
    });
  });


// Define a model
const Task = sequelize.define('Task', {
  name: DataTypes.TEXT,
  status: {
    type: DataTypes.TEXT,
    defaultValue: 'open'
  }
});



// app.post('/login', passport.authenticate('local', { successRedirect: '/index.html', failureRedirect: '/login' }));

app.post('/login', function(req, res, next) {
    console.log('Authenticating user: ', req.body.username);
    passport.authenticate('local', function(err, user, info) {
      if (err) {
        console.error('Error during authentication: ', err);
        return next(err);
      }
      if (!user) {
        console.log('Authentication failed: ');
        return res.json({ redirect: '/login' });
      }
      req.logIn(user, function(err) {
        if (err) {
          console.error('Error during login: ', err);
          return next(err);
        }
        console.log('Authentication successful, redirecting...');
        return res.json({ redirect: '/' });
      });
    })(req, res, next);
  });

app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/login.html'));
});

// Create a new task
app.post('/tasks', async (req, res) => {
    console.log(req.body);
    const task = await Task.create(req.body);
    res.status(201).json(task);
  });
  

  // Get all tasks
app.get('/tasks', ensureAuthenticated, async (req, res) => {
    const tasks = await Task.findAll({
        where: { status: 'open' },
        attributes: ['id','name']}
    );
    res.status(200).json(tasks);
  });

  // Get a task by id
app.get('/tasks/:id', async (req, res) => {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).send('Task not found');
    }
  });

  // Update a task by id
app.put('/tasks/:id', async (req, res) => {
  const updated = await Task.update(req.body, {
    where: { id: req.params.id }
  });
  if (updated) {
    res.status(200).send('Task updated');
  } else {
    res.status(404).send('Task not found');
  }
});

// Delete a task by id
app.delete('/tasks/:id', async (req, res) => {
    const deleted = await Task.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(200).send('Task deleted');
    } else {
      res.status(404).send('Task not found');
    }
  });

app.get('/', ensureAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});