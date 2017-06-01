// Initialize app
var myApp = new Framework7({
    //swipePanel: 'left'
});

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;
$$('.panel-close').on('click', function (e) {
    myApp.closePanel();
});
// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});


//SCRIPT PARA CERRAR SESION
function salir(){
    var usuario = localStorage.getItem('User');
        if (usuario!==null) {
            localStorage.clear();
            destroyAll();
            window.location.href = "view/Login/Index.html";
            //$.mobile.changePage( "view/Login/Index.html", { transition: "flip", reverse: "true", changeHash: "false" });
        }
}

function cambiarPage(link, tipo) {
    mainView.router.loadPage(link);
    mainView.router.reloadPage(link);
    window.tipo = tipo;
    //alert('entrando');
    //window.location.href = link;
}

function cambiarPageGeneral(link) {
    mainView.router.loadPage(link);
    //alert('entrando');
    //window.location.href = link;
}

$(function() {
    document.addEventListener("offline", onOffline, false);

    function onOffline() {
        myApp.alert('Se perdió la conexión a internet', '¡Atención!');
    }

    document.addEventListener("online", onOnline, false);

    function onOnline() {
        myApp.alert('Se recuperó la conexión a internet', '¡Atención!');
    }

    var usuario = localStorage.getItem('User');

    if (usuario!=null) {
        //window.user_id_global = localStorage.getItem('id');
        //window.user_usuario_global = localStorage.getItem('User');
        window.user_id_global = localStorage.getItem('idUser');
        window.user_usuario_global = localStorage.getItem('User');
        window.tipo_usuario_global = localStorage.getItem('TipoUser');
        //$.mobile.changePage( "view/Index/Index.html", { transition: "flip", reverse: "true", changeHash: "false" });
        //cleanUp('IndexIndex');
        if (window.tipo_usuario_global == '131ddd56-1ff1-11e7-80f1-34e6d76e4d35') {
            //$.mobile.changePage( "view/Index/IndexChofer.html", { transition: "flip", reverse: "true", changeHash: "true" });
            mainView.router.loadPage('view/Chofer/Index.html');
        }else if(window.tipo_usuario_global == '25bfe9bb-1f25-11e7-a5c1-34e6d76e4d35'){
            //$.mobile.changePage( "view/Index/Index.html", { transition: "flip", reverse: "true", changeHash: "true" });
            mainView.router.loadPage('view/Viajes/Index.html');
        }

        //window.location.href = "view/Index/Index.html";
    }
});

//BUTTON ENVIAR DE LOGIN
$$('#IniciarSesion').on('click', function(){
 
    var usuario     = $('#usuario').val();
    var contrasenia = $('#contrasenia').val();
    
    $.ajax({
        type: 'POST', 
        url:  window.server + 'login.php',
        data:   ({
                    user: usuario,
                    pass: contrasenia
                }),
        cache: false,
        dataType: 'text',
        success: function(data){
            var obj = $.parseJSON(data);
            var datos = '';
    
            $.each(obj.user, function(i,user){
                if (user.info == 'Incorrecto') {
                    myApp.alert('Datos incorrectos', '¡Atención!');
                }else{
                    var obj = $.parseJSON(data);
                    var datos = '';
            
                    $.each(obj.user, function(i,user){
                        window.user_id_global = user.id;
                        window.user_usuario_global = user.usuario;
                        window.tipo_usuario_global = user.tipousuario_id;
                        datos = user.id+" "+user.usuario+" "+user.tipousuario_id;
                    });
                    
                    var result = datos.split(" ");
                    localStorage.setItem('idUser', result[0]);
                    localStorage.setItem('User', result[1]);
                    localStorage.setItem('TipoUser', result[2]);

                    if (window.tipo_usuario_global == '131ddd56-1ff1-11e7-80f1-34e6d76e4d35') {
                        mainView.router.loadPage('view/Chofer/Index.html');
                    }else if(window.tipo_usuario_global == '25bfe9bb-1f25-11e7-a5c1-34e6d76e4d35'){
                        mainView.router.loadPage('view/Viajes/Index.html');
                    }
                }
            });
        }
    }).fail( function() {

        //alert( 'Comprueba tu conexión a internet e intenta de nuevo' );
        myApp.alert('Comprueba tu conexión a internet e intenta de nuevo', '¡Atención!');

    });//fin de ajax
    
    $('#contrasenia').val(''); 
    //var formData = myApp.formToData('#LoginForm');
    //alert(JSON.stringify(formData));
});  


