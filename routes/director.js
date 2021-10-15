const express = require('express');
const router = express.Router();

// Models for
const Director = require('../models/Director');


// ------START--- Add a new movie -------
router.post('/', (req, res, next) => {
 const director = new Director(req.body);
 const promise = director.save();

 promise.then((data) => {
   res.json(data);
 }).catch((err) => {
   res.json(err);
 });


});
// ------END--- Add a new movie -------


// ------START--- List All Movies -------
router.get('/', (req, res, next) => {
  const promise = Director.aggregate([
    {
      $lookup : { 
        from : 'movies',
        localField : '_id',
        foreignField : 'director_id',
        as : 'movies'

      }
    },
    {
      $unwind : {
        path : '$movies',
        preserveNullAndEmptyArrays : true
      }

    },
    {
      $group : {
        _id : {
          _id : '$_id',
          name : '$name',
          surname : '$surname',
          bio : '$bio'

        },
        movies : {
          $push : '$movies'
        }
      }
    },
    {
      $project : {
        _id : '$_id._id',
        name : '$_id.name',
        surname : '$_id.surname',
        movies : '$movies'

      }
    }

  ]);
 
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
 
 
 });
 // ------END--- List All Movies -------
module.exports = router;
