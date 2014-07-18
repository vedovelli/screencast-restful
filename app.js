var app = require('./app_config.js'),
    userController = require('./controller/userController.js'),
    validator = require('validator');

function valid(attribute) {
  return validator.trim(validator.escape(req.param(attribute)));
}

function responseJSON(resp) {
  res.json(resp);
}

app.get('/', function(req, res) {
  res.end('Servidor ON!');
});

app.get('/users', function(req, res) {
  userController.list(responseJSON(resp));
});

app.get('/users/:id', function(req, res) {
  var id = valid('id');

  userController.user(id, responseJSON(resp));
});

app.post('/users', function(req, res) {
  var fullname = valid('fullname'),
      email = valid('email'),
      password = valid('password');

  userController.save(fullname, email, password, responseJSON(resp));
});

app.put('/users', function(req, res) {
  var id = valid('id'),
      fullname = valid('fullname'),
      email = valid('email'),
      password = valid('password');

  userController.update(id, fullname, email, password, responseJSON(resp));
});

app.delete('/users/:id', function(req, res) {
  var id = valid('id');

  userController.delete(id, responseJSON(resp));
});
