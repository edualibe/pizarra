const express = require('express');
const router = express.Router();
const passport = require('passport');
//conexion a la bd
const pool = require('../database.js');

const { isLoggedIn, isActivesession } = require('../passport/validate-route.js');

router.get('/suc/:id_suc',(req,res)=>{
    res.render('index.hbs');
});

router.get('/admin/login',isActivesession,(req,res)=>{
    res.render('login.hbs');
});


router.get('/admin/main',isLoggedIn, async (req,res)=>{
    const data_team = await pool.query('SELECT * FROM team');
    const data_sucursal = await pool.query('SELECT * FROM sucursal');
    res.render('admin.hbs',{ data_team,data_sucursal });
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