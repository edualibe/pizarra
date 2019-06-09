$(document).ready(()=>{

    const socket = io();

    //escucha solicitud del servidor y le responde con la url actual del cliente
    socket.on('peticion', async ()=>{
        socket.emit('url:req',{
            url: window.location.pathname
        });
    });

    //escucha evento de carga de pagina recibiendo datos del servidor que seran mostrados en la pantalla del cliente
    socket.on('pagina:cargar', (data)=>{

        var parrafo = `
            <p>${data.valor1_1}</p>
            <p>${data.valor1_2}</p>
        `;
        $('#contenido').html(parrafo);        


    });

    //evento que escucha orden de recargar la pagina para actualizar datos en pantalla
    socket.on('pagina:recargar',()=>{
        console.log('recargando pagina');
        location.reload(true);
    });

    //envia evento al servidor con los datos para actualizar base
    $("#btn_enviar").click(()=>{
        console.log('enviando datos al servidor');
        var val_txt1 = $("#txt_var1").val();
        var val_txt2 = $("#txt_var2").val();
        socket.emit('actualizar-base',{
            valor1: val_txt1,
            valor2: val_txt2
        });
    });

});