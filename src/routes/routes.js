const express = require('express');
const router = express.Router();
const passport = require('passport');

const { isLoggedIn, isActivesession } = require('../passport/validate-route.js');
 
/*
router.get('/',isActivesession, (req,res)=>{
    res.render('index.hbs');
});

*/

router.get('/suc/:id_suc',(req,res)=>{
    res.render('index.hbs');
});

router.get('/admin',(req,res)=>{
    res.render('admin.hbs');
});

module.exports = router;