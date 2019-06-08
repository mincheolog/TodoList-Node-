const model = require('../schema/schema');
const bodyParser = require('body-parser');
const util = require('../utility/utility');

const RES_MODEL = {
    head : {
        status : 0,
        message : ""
    },
    body : {}
}

module.exports = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended : true
    }));

    app.get('/Login', (req, res) => {
        let username = req.query.username;
        let password = req.query.password;
        model('login').findOne({ Email : username, Password : password }).select('Email')
            .then((user) => {
                if(user == null) {
                    RES_MODEL.head.status = 403;
                    RES_MODEL.head.message = "Invalid User ID or Password"
                    res.send(RES_MODEL);
                } else {
                    RES_MODEL.head.status = 200;
                    RES_MODEL.body.user = {};
                    RES_MODEL.body.user = user.Email;
                    model('findlist').find()
                        .where('Email').equals(user.Email)
                        .where('Created_At').equals(util.GET_CURRENT_DATE())
                        .then((list) => {
                            RES_MODEL.body.list_data = {};
                            RES_MODEL.body.list_data = list;
            
                            res.send(RES_MODEL);
                            console.log(RES_MODEL);
                            RES_MODEL.body = {};
                        }).catch((err) => {
                            RES_MODEL.head.status = 403;
                            RES_MODEL.head.message = "register error. please check to server. error line 44."
                            
                            res.send(RES_MODEL);
                            console.log(err);
                        });
                }
            }).catch((err) => {
                RES_MODEL.head.status = 403;
                RES_MODEL.head.message = "register error. please check to server. error line 52."
                
                res.send(RES_MODEL);
                console.log(err);
            });
        
        RES_MODEL.head.status = 200;
        RES_MODEL.head.message = "";
        RES_MODEL.body = {};
    });
    app.post('/Submit', (req, res) => {
        var data = req.body;
        var registration_model = model('registration');
        var registration = new registration_model(data);

        registration.save(function(err, data) {
            if (err) {
                RES_MODEL.head.status = 404;
                RES_MODEL.head.message = "register error. please check to server. error line 58."
                
                res.send(RES_MODEL);
            } else if (data == null) {
                RES_MODEL.head.status = 403;
                RES_MODEL.head.message = "what's error??"
                
                res.send(RES_MODEL);
            } else {
                RES_MODEL.head.status = 200;
                RES_MODEL.head.message = "register Action Ok."
                
                res.send(RES_MODEL);
            }
        })
        
        RES_MODEL.head.status = 0;
        RES_MODEL.head.message = "";

    });
    app.post('/todosave', (req, res) => {
        var data = req.body;
        var todosave_model = model('todosave');
        
        model('findlist').find()
            .where('Email').equals(data.Email)
            .where('Created_At').equals(util.GET_CURRENT_DATE())
            .then((list) => {
                if(list.length == 0) {
                    todosave_model = new todosave_model(data);
                    todosave_model.save(data)
                        .then((data) => {
                            RES_MODEL.head.status = 200;
                            RES_MODEL.body.data = {};
                            RES_MODEL.body.data = data;

                            res.send(RES_MODEL);
                            console.log(RES_MODEL);
                        }).catch((err) => {
                            console.error(err);
                        })
                } else {
                    todosave_model.update()
                        .where('Email').equals(data.Email)
                        .where('Created_At').equals(data.Selected_date)
                        .replaceOne(data)
                        .then((data) => {
                            RES_MODEL.head.status = 200;
                            RES_MODEL.body.data = {};
                            RES_MODEL.body.data = data;

                            res.send(RES_MODEL);
                            console.log(RES_MODEL);
                        }).catch((err) => {
                            console.error(err);
                        })
                }
            }).catch((err) => {
                console.error(err);
            });
    });
    app.get('/searchlist', (req,res) => {
        var user_name = req.query.username;
        var date = req.query.selected_date;
        if(date == '' || user_name == '') {
            console.log(date);
            console.log(user_name);
            res.send('date or user is not defined');
        } else {
            model('findlist').find()
                .where('Email').equals(user_name)
                .where('Created_At').equals(date)
                .then((list) => {
                    RES_MODEL.head.status = 200;
                    RES_MODEL.body.data = {};
                    RES_MODEL.body.data = list;

                    res.send(RES_MODEL);
                    console.log(RES_MODEL);
                }).catch((err) => {
                    console.log(err);
                    res.send(err);
                });
        }
        RES_MODEL.head.status = 200;
        RES_MODEL.head.message = "";
        RES_MODEL.body = {};
    });
    app.put('/put', (req, res) => {
        res.send('TEST put');
    });
    app.delete('/delete', (req, res) => {
        res.send('TEST delete');
    })
};

function getList(Email) {
    
}