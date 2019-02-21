const model = require('../schema/schema');
const bodyParser = require('body-parser');
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
        var ObjectID = require('mongodb').ObjectID;
        console.log(new ObjectID);
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
                    data = {
                        data,
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
            var regist_model = model('regist');
            var regist = new regist_model(data);
            console.log(regist);
            regist.save((err, data) => {
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
    app.put('/put', (req, res) => {
        res.send('TEST put');
    });
    app.delete('/delete', (req, res) => {
        res.send('TEST delete');
    })
};