const express = require('express');
const path = require('path');
const config = require('./config/config.json');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = 3000;


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));



const sequelize = new Sequelize(config.development);

// Define a model
const Task = sequelize.define('Task', {
  name: DataTypes.TEXT,
  status: {
    type: DataTypes.TEXT,
    defaultValue: 'open'
  }
});

// Create a new task
app.post('/tasks', async (req, res) => {
    console.log(req.body);
    const task = await Task.create(req.body);
    res.status(201).json(task);
  });
  

  // Get all tasks
app.get('/tasks', async (req, res) => {
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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});