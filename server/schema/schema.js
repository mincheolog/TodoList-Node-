const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SignSchema = mongoose.model('Sign', Schema({
   Email : String
}), 'account');

const RegistSchema = mongoose.model('Regist', Schema({
   "Email" : {
      type : String
   },
   "Password" : {
      type : String,
      default : ''
   },
   "Created_At" : {
      type : Date,
      default : Date.now
   }
}), 'account');

const MODEL = (param) => {
   var model;
   switch (param) {
      case "login":
         model = SignSchema;
         break;
      case "regist":
         model = RegistSchema;
         break;
   }
   return model
};

module.exports = MODEL;