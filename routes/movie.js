const express = require('express');
const router = express.Router();

// Models for
const Movie = require('../models/Movie');
// ------START--- List ALL Movies -------

router.get('/',(req, res, next) => {
    const promise = Movie.aggregate([
      
      {
        $lookup : {
          from : 'directors',
          localField : 'director_id',
          foreignField : '_id',
          as : 'director'
        }
      },
      {
          $unwind : '$director'
      }
    ]);
    promise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    });

});
// ------END--- List ALL Movies -------

// ------START--- Add a new movie -------
router.post('/', (req, res, next) => {
  const { title, imdb, category, country, year,director_id } = req.body;
  const movie = new Movie({
    title: title,
    imdb: imdb,
    category: category,
    country: country,
    year: year,
    director_id : director_id

  });

  /*   movie.save((err,data) => {
      if(err){
        res.json(err);
      }
      res.json(data);
    }); */

  const promise = movie.save();

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })

});
// ------END--- Add a new movie -------

// ------START--- Top 10 Movies -------

router.get('/top10',(req, res, next) => {
  const promise = Movie.find({ }).sort({ imdb : -1}).limit(10);
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });

});
// ------END--- Top 10 Movies -------

// ------START--- One Movie Detail -------
router.get('/:movie_id', (req, res, next) => {
  const promise = Movie.findById(req.params.movie_id);
  promise.then((data) => {
    if(!data){
      next( { message : 'The movie was not found' , code : 404 });
      return; // to ignore error message + res.json data ONLY ERROR MESSAGE
    }
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});
// ------END--- One Movie Detail -------

// ------START--- One Movie Update -------
router.put('/:movie_id', (req, res, next) => {
  const promise = Movie.findByIdAndUpdate(req.params.movie_id, req.body , { new : true }); // new means update returned data 
  promise.then((data) => {
    if(!data){
      next( { message : 'The movie was not found' , code : 404 });
      return; // to ignore error message + res.json data ONLY ERROR MESSAGE
    }
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});
// ------END--- One Movie Update -------

// ------START--- One Movie Delete -------
router.delete('/:movie_id', (req, res, next) => {
  const promise = Movie.findByIdAndRemove(req.params.movie_id); 
  promise.then((data) => {
    if(!data){
      next( { message : 'The movie was not found' , code : 404 });
      return; // to ignore error message + res.json data ONLY ERROR MESSAGE
    }
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});
// ------END--- One Movie Delete -------


// ------START--- Movies between two dates -------
router.get('/between/:start_year/:end_year', (req, res, next) => {
  const { start_year, end_year} = req.params;
  const promise = Movie.find({ 
    year : {
      "$gte" : parseInt(start_year),
      "$lte" : parseInt(end_year)
      
   }}); 
  promise.then((data) => {
  
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});
// ------END--- Movies between two dates -------

module.exports = router;
