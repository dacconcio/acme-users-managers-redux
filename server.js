const User = require('./db/models.js')

const express = require('express');
const app = new express();
const path = require('path');
const bodyparser = require('body-parser');

app.use(bodyparser.json());

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.get('/users/api', (req, res, next) => {
  User.findAll()
    .then(users => res.send(users))
    .catch(err => next(err));
});

app.delete('/users/api/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => user.destroy())
    .then(() => res.sendStatus(200))
    .catch(err => next(err));
});

app.post('/users/api', (req, res, next) => {
  User.create({ name: req.body.name })
    .then(user => {
      user.ManagerId = req.body.managerId;
      user.save();
      return user;
    })
    .then(user => res.send(user))
    .catch(err => next(err));
});

app.put('/users/api', (req, res, next) => {

  User.findById(req.body.userId)
    .then(user => {
      user.name = req.body.newName;
      user.ManagerId = req.body.newManagerId;
      user.save();
      return user;
    })
    .then(user => res.send(user))
    .catch(err => next(err));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
