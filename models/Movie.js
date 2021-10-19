const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MovieSchema = new Schema({

    title :{
        type : String,
        required : [true, '`{PATH}` alanı zorunludur.'],
        maxlength : [20, '`{PATH}` alanı max (`{VALUE}`), ({MAXLENGTH}) karakter olmalıdır.'],
        minlength : [2, '`{PATH}` alanı min (`{VALUE}`), ({MINLENGTH}) karakter olmalıdır.'],
    },
    category : {
        type  : String,
        required : true,
        minlength : 2,
        maxlength : 20
    },
    country :{
        type  : String,
        required : true,
        minlength : 2,
        maxlength : 30
    },
    year :{
        type : Number,
        required : true,
        max : 2040,
        min : 1880
    },
    imdb : {
        type : Number,
        required : true,
        min : 0,
        max : 10

    },
    director_id : Schema.Types.ObjectId,
    createdAt : {
        type : Date,
        default : Date.now
    }


});

module.exports = mongoose.model('movie',MovieSchema);