//conexion a la bd
const pool = require('./database.js');

module.exports = function(io){

    //escuchando conexion del socket
    io.sockets.on('connection', (socket) => {
        console.log('Nuevo cliente conectado');
        nueva_conexion(socket);

        //escuchando evento de actualizacion en bd desde el modulo admin
        socket.on('actualizar-base', async (data)=>{
            //actualizar base de datos con los parametros recibidos en data
            const sucursal_id = 1;
            const row = {
                header_value1_1: data.valor1,
                header_value1_2: data.valor2
            };
            await pool.query('UPDATE header set ? WHERE sucursal_id = ?', [row, sucursal_id]);
            //envia evento a todos los clientes coknectados para que se recarguen y actualicen informacion mostrada
            socket.broadcast.emit('pagina:recargar');
        });
    });



};

function nueva_conexion(socket){

    //emite al cliente evento 'peticion' solicitandole que le envie su url actual
    socket.emit('peticion');
    //queda a la espera de la respuesta del cliente para conocer su url
    socket.on('url:req', async (data_url)=>{ 
        //trycatch para conrolar error en ruta /admin
        try {
            //hace consulta de datos a bd
            const data = await pool.query('SELECT * FROM header WHERE sucursal_id = ?', [id_suc(data_url.url)]);
            if (data.length>0){
                //crear objeto json con datos encontrados
                    const row_img_1 = (data[0].header_content_1).split(',');
                    const row_img_2 = (data[0].header_content_2).split(',');
                    const row_img_3 = (data[0].header_content_3).split(',');
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
        } catch (error) {
            return;
        }
        //emite nuevo evento al cliente pasandole los datos encontrados en la bd para que los muestre en el navegador
        socket.emit('pagina:cargar', data_encabezado);
    });            
};

//funcion que lee fragmento de url (pathname) enviado por el cliente y obtiene el parametro id de sucursal
function id_suc(url_param){
    let id = url_param.replace('/suc/','');
    return parseInt(id);
};
