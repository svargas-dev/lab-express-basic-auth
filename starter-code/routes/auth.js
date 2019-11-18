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


//@GET    /auth/sign-in
//@desc   get sing-in form
//@access public
router.get('/sign-in', (req, res, next) => {
  res.render('sign-in');
  // console.log(req.body);
});


//@POST   /auth/sign-in
//@desc   Sign-in using post fomr
//@access public
router.post('/sign-in', (req, res, next) => {
  let userId;
  const { username, password } = req.body;
  // Find a user with an email that corresponds to the one
  // inserted by the user in the sign in form
  User.findOne({ username })
    .then(user => {
      if (!user) {
        // If no user was found, return a rejection with an error
        // that will be sent to the error handler at the end of the promise chain
        return Promise.reject(new Error("There's no user with that username."));
      } else {
        // If there is an user,
        // save their ID to an auxiliary variable
        userId = user._id;
        console.log(userId);
        // Compare the password with the salt + hash stored in the user document
        return bcryptjs.compare(password, user.passwordHash);
      }
    })
    .then(result => {
      if (result) {
        // If they match, the user has successfully been signed in
        // req.session.user = userId;
        console.log('Log in successful');
        res.redirect('/');
      } else {
        // If they don't match, reject with an error message
        return Promise.reject(new Error('Wrong password.'));
      }
    })
    .catch(error => {
      next(error);
    });
});


module.exports = router;
