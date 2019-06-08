const express = require('express');
const mongodb = require('mongoose');
const route = require('./router/router.js');
const config = require('./config/config.js');
const app = express();

(function init() {
    route(app);
})();

mongodb.Promise = global.Promise;
mongodb.connect(config.db_uri, {useNewUrlParser: true});

const db = mongodb.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('Connect Success!');
});

app.use('/', express.static(__dirname + '/../public/'));

app.listen(config.port, () => {
    console.log(`Start Server Port ${config.port}.`)
});