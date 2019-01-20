const express = require('express');
const route = require('./router/router.js');
const app = express();
var routers = route(app);

let port = process.env.PORT || 8080;

app.use('/', express.static(__dirname + '/../public/'));

app.listen(port, ()=> {
    console.log(`Start Server Port${port}.`)
});