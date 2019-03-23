const express = require('express');
const mongodb = require('mongoose');
const route = require('./router/router.js');
const app = express();
var routers = route(app);
let port = process.env.PORT || 8080;


CONFIG = (param) => {
  var user_name = "TodoAdmin";
  var db_password = "1536414k";

  _PIPE_USER_NAME = () => {
      return user_name;
  };
  _PIPE_USER_PASSWORD = () => {
      return db_password;
  };

  if (param == "user_name"){
      return _PIPE_USER_NAME();
  } else {
      return _PIPE_USER_PASSWORD();
  }
};

var user = CONFIG('user_name');
var password = CONFIG('password');
var db_url = `mongodb://${user}:${password}@ds261644.mlab.com:61644/todoacount`;

mongodb.Promise = global.Promise;
mongodb.connect(db_url, {useNewUrlParser: true});

const db = mongodb.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('Connect Success!');
});

app.use('/', express.static(__dirname + '/../public/'));

app.listen(port, () => {
    console.log(`Start Server Port${port}.`)
});