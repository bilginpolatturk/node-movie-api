const mongoose = require('mongoose');

module.exports = () => {

    mongoose.connect('mongodb+srv://movie_user:123456123456@movie-api.7pk71.mongodb.net/movie-api?retryWrites=true&w=majority');
    mongoose.connection.on('open', () =>{
        console.log('MongoDB : Connected');
    });

    mongoose.connection.on('error', (err) =>{
        console.log('MongoDB : Error',err);
    });

    mongoose.Promise = global.Promise;
};