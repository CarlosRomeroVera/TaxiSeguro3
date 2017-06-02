myApp.onPageInit('ChoferIndex', function(page) { 
    //alert('entrando');
    var intervalId = null;
    var coords = '';
    $(function() {
        $.ajax({
            type: "POST", 
            url:  window.server + "chofer/obtener_estado.php",
            data: ({
                id: window.user_id_global,
            }),
            cache: false,
            dataType: "text",
            success: function(data){
                document.getElementById('info').innerHTML = data;
            }
        }).fail( function() {

            //alert( 'Comprueba tu conexión a internet e intenta de nuevo' );
            myApp.alert('Comprueba tu conexión a internet', '¡Atención!');

        });//fin de ajax

        $("#activa").click(function() {
             $.ajax({
                type: "POST", 
                url:  window.server + "chofer/cambiar_estado.php",
                data: ({
                    id: window.user_id_global,
                }),
                cache: false,
                dataType: "text",
                success: function(data){
                    document.getElementById('info').innerHTML = data;
                }
            }).fail( function() {

                //alert( 'Comprueba tu conexión a internet e intenta de nuevo' );
                myApp.alert('Comprueba tu conexión a internet e intenta de nuevo', '¡Atención!');

            });//fin de ajax
        });

        var sync = function(){ 
            if(document.getElementById('info').innerHTML == 'Estado: LIBRE') {
                navigator.geolocation.getCurrentPosition(
                  function (position){
                    coords =  position.coords.latitude + ',' + position.coords.longitude;
                    envia(coords);
                  },function(error){console.log(error);}
                );
                function envia(coords){
                    $.ajax({
                        type: "POST", 
                        url:  window.server + "chofer/enviar_coords.php",
                        data: ({
                            id: window.user_id_global,
                            coor_actuales: coords
                        }),
                        cache: false,
                        dataType: "text",
                        success: function(data){
                            if (data != 'Error') {
                                window.viaje_id = data;
                                clearInterval(refreshIntervalId);
                                mainView.router.loadPage('view/Chofer/peticion.html');
                            }
                        }
                    }).fail( function() {

                        //alert( 'Comprueba tu conexión a internet e intenta de nuevo' );
                        myApp.alert('Comprueba tu conexión a internet e intenta de nuevo', '¡Atención!');

                    });//fin de ajax
                }
                /**/
             } else {
                  //alert('No enviando coords');
             }
        };

        refreshIntervalId = setInterval(sync, 20000);
    });
})
