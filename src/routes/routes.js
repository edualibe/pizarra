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
        var imagenes_1, imagenes_2, imagenes_3 = [];
        imagenes_1 = (data[0].header_content_1).split(',');
        imagenes_2 = (data[0].header_content_2).split(',');
        imagenes_3 = (data[0].header_content_3).split(',');
        //crear objeto json con datos encontrados
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

router.get('/admin/altasucursal',isLoggedIn, async (req,res)=>{
    const data_team = await pool.query('SELECT * FROM team');
    res.render('altasucursal.hbs',{ data_team });
});

router.get('/admin/altagrupo', isLoggedIn, (req,res)=>{
    res.render('altagrupo.hbs');
});

router.post('/admin/altagrupo', async (req,res)=>{
    const { team_name } = req.body;
    const data_team = await pool.query('SELECT * FROM team WHERE team_name = ?', [team_name]);
    console.log(data_team.length);
    if (data_team.length==0){
        const nuevoregistro = {
            team_name
        };
        await pool.query('INSERT INTO team set ?',[nuevoregistro]);    
    }
    res.redirect('/admin/altasucursal');
});

module.exports = router;