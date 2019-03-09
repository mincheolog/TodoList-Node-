const mongoose = require('mongoose');
const util = require('../utility/utility');
const Schema = mongoose.Schema;

const SignSchema = mongoose.model('Sign', Schema({
   Email : String
}), 'account');

const ResistSchema = mongoose.model('Registration', Schema({
   Email : {
      type : String,
      unique : true,
      required : true
   },
   Password : {
      type : String,
      default : ''
   },
   Created_At : {
      type : String,
      default : util.GET_CURRENT_DATE
   },
}), 'account');

const TodoListSchema = mongoose.model('GetList', Schema({
   Email : String,
   Created_At : String
}), 'list');

const TodosaveSchema = mongoose.model('SaveList', Schema({
   Email : {
      type : String
   },
   Todolist : [mongoose.Schema.Types.Mixed],
   Created_At : {
      type : String,
      default : util.GET_CURRENT_DATE
   }
}), 'list');

const MODEL = (param) => {
   var model;
   switch (param) {
      case "login":
         model = SignSchema;
         break;
      case "registration":
         model = ResistSchema;
         break;
      case "findlist":
         model = TodoListSchema;
         break;
      case "todosave":
         model = TodosaveSchema;
         break;
   }
   return model
};

module.exports = MODEL;