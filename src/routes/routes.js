const express = require('express');
const router = express.Router();
const passport = require('passport');
//conexion a la bd
const pool = require('../database.js');

const { isLoggedIn, isActivesession } = require('../passport/validate-route.js');

router.get('/suc/:id_suc', async (req,res)=>{
    const { id_suc } = req.params;

    const data = await pool.query('SELECT * FROM header WHERE sucursal_id = ?', [id_suc]);
    if (data.length>0){
        console.log(data);
        //crear objeto json con datos encontrados
        /*
        const row_img_1 = (data[0].header_content_1).split(',');
        const row_img_2 = (data[0].header_content_2).split(',');
        const row_img_3 = (data[0].header_content_3).split(',');
        */
        var imagenes_1, imagenes_2, imagenes_3 = [];
        imagenes_1 = (data[0].header_content_1).split(',');
        imagenes_2 = (data[0].header_content_2).split(',');
        imagenes_3 = (data[0].header_content_3).split(',');
        var data_encabezado = {
            "thead1": data[0].header_title1,
            "thead2": data[0].header_title2,
            "thead3": data[0].header_title3,
            "sub_thead1_1": data[0].header_subtitle1_1,
            "sub_thead1_2": data[0].header_subtitle1_2,
            "sub_thead2_1": data[0].header_subtitle2_1,
            "sub_thead2_2": data[0].header_subtitle2_2,
            "sub_thead3_1": data[0].header_subtitle3_1,
            "sub_thead3_2": data[0].header_subtitle3_2,
            "valor1_1": data[0].header_value1_1,
            "valor1_2": data[0].header_value1_2,
            "valor2_1": data[0].header_value2_1,
            "valor2_2": data[0].header_value2_2,
            "valor3_1": data[0].header_value3_1,
            "valor3_2": data[0].header_value3_2,
        };
    } else {
        //crea objeto json con valores vacios
        var data_encabezado = {
            "thead1": "",
            "thead2": "",
            "thead3": "",
            "sub_thead1_1": "",
            "sub_thead1_2": "",
            "sub_thead2_1": "",
            "sub_thead2_2": "",
            "sub_thead3_1": "",
            "sub_thead3_2": "",
            "valor1_1": "",
            "valor1_2": "",
            "valor2_1": "",
            "valor2_2": "",
            "valor3_1": "",
            "valor3_2": "",
        };
    };
    res.render('index.hbs',{ data_encabezado, imagenes_1, imagenes_2, imagenes_3 });
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

router.get('/altasucursal',isLoggedIn, (req,res)=>{
    res.render('altasucursal.hbs');
});

module.exports = router;