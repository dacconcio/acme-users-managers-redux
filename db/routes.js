const User = require('./Models.js');
const Express = require('express');
const app = new Express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use('/dist', Express.static(path.join(__dirname, '/dist')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.get('/api/users', (req, res, next) => {
  User.findAll()
    .then(users => {
      res.send(users);
    })
    .catch(err => next(err));
});

app.get('/api/users/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => res.send(user))
    .catch(err => next(err));
});

app.delete('/api/users/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => user.destroy())
    .then(res.sendStatus(200))
    .catch(err => next(err));
});

app.post('/api/users/', (req, res, next) => {
  User.create({
    name: req.body.user
  })
    .then(user => res.send(user))
    .catch(err => next(err));
});

app.put('/api/users/', (req, res, next) => {
  User.findById(req.body.user.id)
    .then(userToUpdate => {
      userToUpdate.update({ name: req.body.user.name });
    })
    .then(updatedUser => res.sendStatus(200))
    .then(() => console.log('updated'))
    .catch(err => next(err));
});

module.exports = app
