const model = require('../schema/schema');
const bodyParser = require('body-parser');
const util = require('../utility/utility');
let username, password;
let result = {};

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
            model('login').findOne({ Email : username }, (err, data) => {
                if (err) {
                    throw err;
                } else if(data == null) {
                    console.log(data);
                    res.send("Empty Data");
                } else {
                    list = () => {
                        let data2;
                        model('findlist').find(
                            { Email : data["Email"] },
                            { Created_At: util.GET_CURRENT_DATE },
                            (err, todolist) => {
                                if(err){
                                    throw err;
                                } else if(todolist == null) {
                                    todolist = "";
                                } else {
                                    data2 = todolist;
                                }
                            });
                        return data2;
                    };
                    let data3 = list();
                    data = {
                        data,
                        data3,
                        success : 1
                    };
                    console.log(data);
                    res.send(data);
                }
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
            registration.save((err, data) => {
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
    app.put('/put', (req, res) => {
        res.send('TEST put');
    });
    app.delete('/delete', (req, res) => {
        res.send('TEST delete');
    })
};