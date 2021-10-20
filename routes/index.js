const express = require('express');
const router = express.Router();

// bcrypt password hash
const bcrypt = require('bcryptjs');

//User Model
const User = require('../models/Users');


/* DEAFULT */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

// Register User Start -----
router.post('/register', (req, res, next) => { 
  const {username , password} = req.body;
  //bcrypt password hash
    bcrypt.hash(password, 10).then((hash) => {
      const user =  new User({
        username : username,
        password : hash
      });
    
      const promise = user.save();
      promise.then((data) => {
        res.json(data);
      }).catch((err) => {
        res.json(err);
      });
    });


});
// Register User End -----


module.exports = router;
