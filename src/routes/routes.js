const express = require('express');
const router = express.Router();
const passport = require('passport');
//conexion a la bd
const pool = require('../database.js');

const { isLoggedIn, isActivesession } = require('../passport/validate-route.js');

router.get('/suc/:id_suc', (req,res)=>{
    res.render('index.hbs');
});

router.get('/admin/login',isActivesession,(req,res)=>{
    res.render('login.hbs');
});

router.get('/admin/main',isLoggedIn, async (req,res)=>{
    /*
    const data_team = await pool.query('SELECT * FROM team');
    const data_sucursal = await pool.query('SELECT * FROM sucursal');
    res.render('admin.hbs',{ data_team,data_sucursal });
    */
    //select * from header join sucursal on header.sucursal_id = sucursal.sucursal_id join team on sucursal.team_id = team.team_id;
    
    //const data_sucursales = await pool.query('SELECT * FROM header');
    const data_sucursales = await pool.query('SELECT * FROM header JOIN sucursal ON header.sucursal_id = sucursal.sucursal_id JOIN team ON sucursal.team_id = team.team_id');
    
    res.render('admin.hbs',{ data_sucursales });
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