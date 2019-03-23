const model = require('../schema/schema');
const bodyParser = require('body-parser');
const util = require('../utility/utility');
let username, password;
let result = {};

list = (username, callback) => {
    model('findlist')
        .find(
        { Email : username },
        { Created_At: util.GET_CURRENT_DATE })
        .then((list) => {
            callback(list);
        })
        .catch((err) => {
            callback(err);
        });
};

module.exports = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended : true
    }));

    app.get('/Login', (req, res) => {
        username = req.query.username;
        password = req.query.password;
        if(!username || !password) {
            result["success"] = 0;
            result["error"] = "id error";
            if (!password) {
                result["success"] = 3;
                result["error"] = "id and  password error"
            }
            res.json(result);
        } else {
            model('login').findOne({ Email : username, Password : password }).select('Email')
                .then((user) => {
                    let data = {};
                    let list_data;
                    let user_err = user ==  null ? 1 : 0;
                    if (user_err === 0) {
                        user_err === 0
                            ? list(username, (item) => {
                                list_data = item;
                            })
                            : "Empty data";
                        setTimeout(()=> {
                            data = {
                                user,
                                list_data,
                                status : 200
                            };
                            res.send(data);
                        }, 1000);
                    } else {
                        res.send(data = { status : 403 })
                    }
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    });
    app.post('/Submit', (req, res) => {
        username = req.body.Email;
        password = req.body.Password;
        console.log(req.body);
        if(!username || !password) {
            result["success"] = 0;
            result["error"] = "id is empty";
            if (!password) {
                result["success"] = 3;
                result["error"] = "id or password empty"
            }
            res.json(result);
        } else {
            var data = req.body;
            var registration_model = model('registration');
            var registration = new registration_model(data);
            console.log(registration);
            registration.save(function(err, data) {
                if (err) {
                    throw err;
                } else if (data == null) {
                    console.log(data);
                    res.send("Empty Data");
                } else {
                    res.send(data);
                }
            })
        }
    });
    app.post('/todosave', (req, res) => {
        var data = req.body;
        var todosave_model = model('todosave');
        var todosave = new todosave_model(data);
        console.log(data);
        todosave.save((err, data) => {
            if (err) {
                throw err;
            } else if (data == null) {
                console.log(data);
                res.send("Empty Data");
            } else {
                res.send(data);
            }
        })
    });
    app.get('/searchlist', (req,res) => {
        var date = req.query.selected_date;
        date != '' ? res.send('response success' + date) : res.send('date is not defined');
    });
    app.put('/put', (req, res) => {
        res.send('TEST put');
    });
    app.delete('/delete', (req, res) => {
        res.send('TEST delete');
    })
};