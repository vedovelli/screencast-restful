var db = require('../db_config.js');

function returnUser(error, user, string) {
  if (error) {
    callback({ error: string })
  } else {
    callback(user);
  }
}

function assignment(attribute) {
  if (attribute) {
    user.attribute = attribute;
  }
}

exports.list = function(callback){
  db.User.find({}, returnUser(error, users, 'Não foi possivel retornar os usuarios'));
};

exports.user = function(id, callback) {
  db.User.findById(id, returnUser(error, user, 'Não foi possivel retornar o usuario'));
};

exports.save = function(fullname, email, password, callback){
  new db.User({
    'fullname': fullname,
    'email': email,
    'password': password,
    'created_at': new Date()
  }).save(returnUser(error, user, 'Não foi possivel salvar o usuario'));
};

exports.update = function(id, fullname, email, password, callback) {
  db.User.findById(id, function(error, user) {
    assignment(fullname);
    assignment(email);
    assignment(password);
    user.save(returnUser(error, user, 'Não foi possivel salvar o usuario'));
  });
};

exports.delete = function(id, callback) {
  db.User.findById(id, function(error, user) {
    if (error) {
      callback({ error: 'Não foi possivel retornar o usuario' });
    } else {
      user.remove(function(error) {
        if (!error) {
          callback({ response: 'Usuário excluido com sucesso' });
        }
      });
    }
  });
};
