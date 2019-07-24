var procesoslider;
var indice=1;
var indiceanterior=1;

$(document).ready(()=>{
    imagenes = $(".img-slider");
    $(".img-slider").hide();
    $(".img-slider:first").fadeIn(500);

    //inicializa conexion con socketio
    const socket = io();
    /*
    //escucha solicitud del servidor y le responde con la url actual del cliente
    socket.on('peticion', async ()=>{
        socket.emit('url:req',{
            url: window.location.pathname
        });
    });

    */

    /*
    //escucha evento de carga de pagina recibiendo datos del servidor que seran mostrados en la pantalla del cliente
    socket.on('pagina:cargar', (data)=>{
        imagenes_1 = [];
        imagenes_1 = data.img_1;
        $("#img-slider").fadeOut(500);
        $('#img-slider').attr("src","/img/"+imagenes_1[0]);
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
    */
    
    procesoslider = setInterval(()=>{
        //console.log(window.location.pathname);
        if (window.location.pathname.substr(0,6)!='/admin'){
            do {
                indice = Math.floor(Math.random()*(imagenes.length));
            } while (indice==indiceanterior || indice==0);
            $(".img-slider").fadeOut();
            indiceanterior = indice;
            $(".img-slider:nth-child("+indice+")").fadeIn();
        };                
    },10000);
    
    $("#btn-agregargrupo").click(()=>{
        window.location = "/admin/altagrupo";
    });

    $("#btn-atrasgrupo").click(()=>{
        window.location = "/admin/altasucursal";
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
    
    $("#sub-grupal").show();
    $("#sub-sucursal").hide();

    $("#select-type").change(()=>{
        let selection = $("#select-type").val();
        let subgroup = $("#sub-grupal");
        let subsuc = $("#sub-sucursal");
        switch (selection) {
            case "group":
                subgroup.show();
                subsuc.hide();
                break;
            case "individual":
                subgroup.hide();
                subsuc.show();
                break;
            case "general":
                subgroup.hide();
                subsuc.hide();
                break;                
            default:
                break;
        }
    });

});