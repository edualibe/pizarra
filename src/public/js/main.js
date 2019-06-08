$(document).ready(()=>{

    const socket = io();

    socket.on('peticion', async ()=>{
        socket.emit('url:req',{
            url: window.location.pathname
        });
    });

    socket.on('pagina:cargar', (data)=>{

        var parrafo = `
            <p>${data}</p>
        `;
        $('#contenido').html(parrafo);        


    });

    $("#btn_enviar").click(()=>{
        console.log('enviando datos al servidor');
        let var1 = $("#txt_var1").val();
        console.log('datos obtenidos: ' + var1);
        socket.emit('actualizar-base',{
            valor1: var1
        });
    });

});