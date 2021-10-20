const express = require('express');
const router = express.Router();

// bcrypt password hash
const bcrypt = require('bcryptjs');

//User Model
const User = require('../models/Users');

// jwt add
const jwt = require('jsonwebtoken');

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

router.post('/authenticate', (req, res, next) => {

  const {username, password} = req.body;
  User.findOne({
    username : username
  }, (err, user) => {
    
    if(err){
      throw err;
    }

    if(!user){
      res.json({
        status : false,
        message : 'Authentication failed, user not found!'
      });
    }else{

      bcrypt.compare(password, user.password).then((result) => {
        if(!result){
          res.json({
            status : false,
            message : 'Authentication failed, wrong password!'
          });
        }else{
          const payload  = {
            username : username

          };
          const token = jwt.sign(payload, req.app.get('api_secret_key'),{
            expiresIn : 720
          });

          res.json({
            status : true,
            token : token
          })

        }
      });
    }
  })
});


module.exports = router;
