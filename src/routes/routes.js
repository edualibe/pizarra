const express = require('express');
const router = express.Router();
const passport = require('passport');

const { isLoggedIn, isActivesession } = require('../passport/validate-route.js');

router.get('/suc/:id_suc',(req,res)=>{
    res.render('index.hbs');
});

router.get('/admin/login',isActivesession,(req,res)=>{
    res.render('login.hbs');
});

router.get('/admin/main',isLoggedIn,(req,res)=>{
    res.render('admin.hbs');
});

router.post('/admin/login', passport.authenticate('local-signin', {
    successRedirect: '/admin/main',
    failureRedirect: '/admin/login',
    failureFlash: true
}));

router.get('/admin/logout', (req, res) => {
    req.logOut();
    res.redirect('/admin/login');
});

module.exports = router;