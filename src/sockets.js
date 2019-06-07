module.exports = function(io){

    io.on('connection', (socket) => {
        console.log('Nuevo cliente conectado');
        socket.emit('peticion'); //emite al cliente evento informando nueva conexion y solicitandole su url actual

        
        socket.on('url:req', async (data_url)=>{ //cliente le responde con un nuevo evento informandole url
            //funcion que lee fragmento de url (pathname) enviado por el cliente y obtiene el parametro id de sucursal
            const id_suc = (url_param)=>{
                let id = url_param.replace('/suc/','');
                return parseInt(id);
            };
            const data_encabezado = 'Leyendo datos de suc: ' + id_suc(data_url.url);
            //hace consulta de datos a bd
            /*const data = await pool.query('SELECT * FROM header WHERE sucursal_id = ?', [id_suc(data_url.url)]);
            const row_img_1 = (data[0].header_content_1).split(',');
            const row_img_2 = (data[0].header_content_2).split(',');
            const row_img_3 = (data[0].header_content_3).split(',');
            if (data.length>0){
                //crear objeto json con datos encontrados
                var data_encabezado = {
                    "thead1": data[0].header_title1,
                    "thead2": data[0].header_title2,
                    "thead3": data[0].header_title3,
                    "sub_thead1_1": data[0].header_subtitle1_1,
                    "sub_thead1_2": data[0].header_subtitle2_1,
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
                    "img_1": row_img_1,
                    "img_2": row_img_2,
                    "img_3": row_img_3
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
                    "img_1": "",
                    "img_2": "",
                    "img_3": ""
                };
            }
            */
            //emite nuevo evento al cliente pasandole los datos encontrados en la bd para que los muestre en el navegador
            socket.emit('pagina:cargar', data_encabezado);
        });



    });


};
