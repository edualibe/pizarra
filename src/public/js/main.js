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

});