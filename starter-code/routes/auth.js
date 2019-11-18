'use strict';

const { Router } = require('express');
const router = Router();

const User = require('./../models/user');
const bcryptjs = require('bcryptjs');


//@GET    /auth/sign-up
//@desc   get sing-up form
//@access public
router.get('/sign-up', (req, res, next) => {
  res.render('sign-up');
});


//@POST   /auth/sign-up
//@desc   create new user using sign-up form
//@access public
router.post('/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  // console.log(req.body);
  bcryptjs
    .hash(password, 10)
    .then(hash => {
      return User.create({
        username,
        passwordHash: hash
      });
    })
    .then(user => {
      console.log('Created user', user);
      // req.session.username = user._id;
      res.redirect('/');
    })
    .catch(error => {
      next(error);
    });
});


module.exports = router;
