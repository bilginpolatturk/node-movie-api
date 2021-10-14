const express = require('express');
const router = express.Router();

// Models for
const Movie = require('../models/Movie');

router.post('/', (req, res, next) =>  {
  const { title , imdb , category , country , year } = req.body;
  const movie = new Movie({ 
    title : title,
    imdb : imdb,
    category : category,
    country  : country,
    year : year

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

module.exports = router;
