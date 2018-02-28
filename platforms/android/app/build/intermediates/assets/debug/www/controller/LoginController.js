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
        //alert("Device is ready!");
    var push = PushNotification.init({
           "android": {
               "senderID": "3477556471",
               "sound": true,
               "vibrate": true,
           },
           "ios": {
             "sound": true,
             "alert": true,
             "badge": true
           },
           "windows": {}
        });

        push.on('registration', function(data) {
           //alert("registration event: " + data.registrationId);
           var id = data.registrationId;
           window.registrationId = id;
           $.ajax({
              type: "POST",
              url: "https://services.sm2consultores.com/ptaxiseguro/php/registro.php",
              data: { name: null, email: null, regId: id }
            })
              .done(function( msg ) {
                //alert( "Data Saved: " + msg );
              })
              .fail( function( jqXHR, textStatus, errorThrown ) {

                  if (jqXHR.status === 0) {

                    alert('Not connect: Verify Network.');

                  } else if (jqXHR.status == 404) {

                    alert('Requested page not found [404]');

                  } else if (jqXHR.status == 500) {

                    alert('Internal Server Error [500].');

                  } else if (textStatus === 'parsererror') {

                    alert('Requested JSON parse failed.');

                  } else if (textStatus === 'timeout') {

                    alert('Time out error.');

                  } else if (textStatus === 'abort') {

                    alert('Ajax request aborted.');

                  } else {

                    alert('Uncaught Error: ' + jqXHR.responseText);

                  }

                });            

           var oldRegId = localStorage.getItem('registrationId');
           if (oldRegId !== data.registrationId) {
               // Save new registration ID
               localStorage.setItem('registrationId', data.registrationId);
               // Post registrationId to your app server as the value has changed
           }
        });

        push.on('notification', function(data) {
            // alert('Nueva notificación push');
            // mainView.router.reloadPage('view/User/indexUser.html');
        });

        push.on('error', function(e) {
           alert("push error = " + e.message);
        });
});


//SCRIPT PARA CERRAR SESION
function salir(){
    var usuario = localStorage.getItem('User');
        if (usuario!==null) {
            if (window.tipo_usuario_global == '131ddd56-1ff1-11e7-80f1-34e6d76e4d35') {

                $.ajax({
                    type: "POST", 
                    url:  window.server + "chofer/obtener_estado.php",
                    data: ({
                        id: window.user_id_global,
                    }),
                    cache: false,
                    dataType: "text",
                    async: false,
                    success: function(data){

                        if (data == 'Estado: LIBRE') {

                            $.ajax({
                                type: "POST", 
                                url:  window.server + "chofer/cambiar_estado.php",
                                data: ({
                                    id: window.user_id_global,
                                }),
                                cache: false,
                                dataType: "text",
                                async: false,
                                success: function(data){
                                    //document.getElementById('info').innerHTML = data;
                                }
                            });//fin de ajax
                        }
                    }
                })
                
            }
            
            localStorage.clear();
            destroyAll();
            //window.location.href = "Index.html";
            //mainView.router.loadPage('Index.html');
            location.reload();
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

                    if(window.tipo_usuario_global == '25bfe9bb-1f25-11e7-a5c1-34e6d76e4d35'){
                        $.ajax({
                            type: 'POST', 
                            url:  window.server + 'asignagsm_user.php',
                            data:   ({
                                        registrationId: window.registrationId,
                                        userId: window.user_id_global
                                    }),
                            cache: false,
                            dataType: 'text',
                            success: function(data){
                                // alert(data);
                            }
                        }).fail( function( jqXHR, textStatus, errorThrown ) {

                              if (jqXHR.status === 0) {

                                alert('Not connect: Verify Network.');

                              } else if (jqXHR.status == 404) {

                                alert('Requested page not found [404]');

                              } else if (jqXHR.status == 500) {

                                alert('Internal Server Error [500].');

                              } else if (textStatus === 'parsererror') {

                                alert('Requested JSON parse failed.');

                              } else if (textStatus === 'timeout') {

                                alert('Time out error.');

                              } else if (textStatus === 'abort') {

                                alert('Ajax request aborted.');

                              } else {

                                alert('Uncaught Error: ' + jqXHR.responseText);

                              }

                            }); 
                    }
                    
                    
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


