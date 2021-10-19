const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DirectorSchema = new Schema({

 name :{
    type : String,
    required : true,
    minlength : 2,
    maxlength : 30
 },
 surname : {
     type : String,
     required : true,
     minlength : 2,
     maxlength : 30
 },
 bio : {
     type : String,
     required : true,
     minlength : 2,
     maxlength : 100
 },
 createdAt : {
     type: Date,
     default : Date.now
 }

});

module.exports = mongoose.model('director',DirectorSchema);