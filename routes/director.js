const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');
// Models for
const Director = require('../models/Director');


// ------START--- Add a new director -------
router.post('/', (req, res, next) => {
 const director = new Director(req.body);
 const promise = director.save();

 promise.then((data) => {
   res.json(data);
 }).catch((err) => {
   res.json(err);
 });


});
// ------END--- Add a new director -------


// ------START--- List All Directors -------
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
 // ------END--- List All Directors -------

 // ------START--- List One Director -------
router.get('/:director_id', (req, res, next) => {
  const promise = Director.aggregate([
    {
      $match : {
        '_id' : mongoose.Types.ObjectId(req.params.director_id)
      }
    },
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
 // ------END--- List One Director -------

 // ------START--- One Director Update -------
router.put('/:director_id', (req, res, next) => {
  const promise = Director.findByIdAndUpdate(req.params.director_id, req.body , { new : true }); // new means update returned data 
  promise.then((data) => {
    if(!data){
      next( { message : 'The director was not found' , code : 404 });
      return; // to ignore error message + res.json data ONLY ERROR MESSAGE
    }
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});
// ------END--- One Director Update -------

// ------START--- One Director Delete -------
router.delete('/:director_id', (req, res, next) => {
  const promise = Director.findByIdAndRemove(req.params.director_id); 
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
// ------END--- One Director Delete -------
module.exports = router;
