const chai = require('chai');
const chaiHttp = require('chai-http');

const should  = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

let token,movieId;

describe('/api/movies Tests' , () => {

    // Fetch the JWT Token
    before((done) => {   // before starting test
        chai.request(server).post('/authenticate').send({
            username : 'john1',
            password : '123456'
        }).end((err,res) => {
            token = res.body.token;
            console.log(token);
            done();
        });
    });   

    describe('/GET movies' , () => {

        it('It should GET all movies ' , (done) => {
            chai.request(server).get('/api/movies').set('x-access-token' , token)
            .end((err,res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
        });
    });

    describe('/POST movie' , () => {
        it('It should POST a movie' , (done) => {
            const movie = {
                title : 'Test Movie',
                director_id : '6170131d0af1b76a2ca46384',
                category : 'Action',
                country : 'USA',
                year : 2014,
                imdb : 7.7
            };
            chai.request(server).post('/api/movies').send(movie)
            .set('x-access-token',token).end((err,res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('director_id');
                res.body.should.have.property('category');
                res.body.should.have.property('country');
                res.body.should.have.property('year');
                res.body.should.have.property('imdb');
                movieId = res.body._id;
                done();
            });
        });
    });

    describe('/GET/:movie_id movie' ,() => {

        it('It should GET a movie by the given id' ,(done) => {
            chai.request(server).get('/api/movies/' + movieId).set('x-access-token' , token).
            end((err,res) => {
                res.should.have.status(200);
                res.body.should.have.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('director_id');
                res.body.should.have.property('category');
                res.body.should.have.property('country');
                res.body.should.have.property('year');
                res.body.should.have.property('imdb');
                res.body.should.have.property('_id').eql(movieId);
                done();
            });
        });
    });

    describe('/PUT/:movie_id movie' , () => {
        it('It should UPDATE a movie by given id' , (done) => {
            const movie = {
                title : 'Updated Test Movie',
                director_id : '6170131d0af1b76a2ca46384',
                category : 'Crime',
                country : 'Italy',
                year : 2011,
                imdb : 6.9
            };
            chai.request(server).put('/api/movies/'+movieId).send(movie)
            .set('x-access-token',token).end((err,res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title').eql(movie.title);
                res.body.should.have.property('director_id').eql(movie.director_id);
                res.body.should.have.property('category').eql(movie.category);
                res.body.should.have.property('country').eql(movie.country);
                res.body.should.have.property('year').eql(movie.year);
                res.body.should.have.property('imdb').eql(movie.imdb);
                
                
                done();
            });
        });
    });
   
    describe('/DELETE/:movie_id movie' , () => {
        it('It should DLETE a movie by given id' , (done) => {
          
            chai.request(server).delete('/api/movies/'+movieId)
            .set('x-access-token',token).end((err,res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('_id').eql(movieId);
             
                
                
                done();
            });
        });
    });

});