var procesoslider;
var indice=0;
var indiceanterior=0;
var imagenes_1 = [];
var imagenes_2 = [];
var imagenes_3 = [];

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
        imagenes_1 = [];
        imagenes_1 = data.img_1;
        $("#img-slider").fadeOut(500);
        $('#img-slider').attr('src','../img/'+imagenes_1[0]);
        $("#img-slider").fadeIn(500);        
        var tabla = `
            <table class="tabla-cotizador">
            <thead>
                <td colspan="2">${data.thead1}</td>
                <td colspan="2">${data.thead2}</td>
                <td colspan="2">${data.thead3}</td>
            </thead>
            <tr>
                <td>${data.sub_thead1_1}</td>
                <td>${data.sub_thead1_2}</td>
                <td>${data.sub_thead2_1}</td>
                <td>${data.sub_thead2_2}</td>
                <td>${data.sub_thead3_1}</td>
                <td>${data.sub_thead3_2}</td>
            </tr>
            <tr>
                <td>${data.valor1_1}</td>
                <td>${data.valor1_2}</td>
                <td>${data.valor2_1}</td>
                <td>${data.valor2_2}</td>
                <td>${data.valor3_1}</td>
                <td>${data.valor3_2}</td>
            </tr>
            </table>
        `;
        $('#contenedor-cotizador').html(tabla);    
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

    procesoslider = setInterval(function(){
        do {
            indice = Math.floor(Math.random()*(imagenes_1.length));
        } while (indice==indiceanterior);
        $("#img-slider").fadeOut(800,function(){
            $('#img-slider').attr('src','../img/'+imagenes_1[indice]);
            $("#img-slider").fadeIn(800);                        
            indiceanterior = indice;
        });
    },10000);

});