'use strict';

const { Router } = require('express');
const router = Router();
const User = require('./../models/user');

// const User = require('./../models/user');
const routeGuard = require('./../middleware/route-guard');

//@GET    /profile
//@desc   display user info
//@access private
router.get('/', routeGuard, (req, res, next) => {
  const user = res.locals.user;
  res.render('profile/profile', { user });
});

//@GET    /profile/edit
//@desc   display user info
//@access private
router.get('/edit', routeGuard, (req, res, next) => {
  const user = res.locals.user;
  console.log('User details from /res.locals.user', user);
  console.log('User details from req.user', req.user);
  console.log('User details from req.session.user', req.session.user);
  res.render('profile/profile-edit', { user });
});

//@POST   /profile/edit
//@desc   display user info
//@access private
router.post('/edit', routeGuard, (req, res, next) => {
  User.findOneAndUpdate({ _id: req.user._id }, { name: req.body.name })
    .then(user => {
      res.redirect('/profile');
    })
    .catch(err => next(err));
});


module.exports = router;
