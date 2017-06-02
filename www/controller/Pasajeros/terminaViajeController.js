myApp.onPageInit('PasajeroTerminaViaje', function(page) {
    function obtenerMonto(){
        //Obtener datos del viaje
        $.ajax({
            type: "POST", 
            url:  window.server + "chofer/obtener_viaje.php",
            data: ({
                id: window.viaje_id
            }),
            cache: false,
            dataType: "text",
            success: function(data){
                if (data != 'Error') {
                    var obj = $.parseJSON(data);
                    $.each(obj.viaje, function(i,viaje){
                        $("#tarifa").html('MX $'+viaje.monto_final);
                    });
                }else{
                    obtenerMonto();
                }
            }
        }).fail( function() {

                //alert( 'Comprueba tu conexión a internet e intenta de nuevo' );
                myApp.alert('Comprueba tu conexión a internet', '¡Atención!');
                obtenerMonto();
            });//fin de ajax
    }

    function obtenerChofer(){
        //Obtener datos del viaje
        $.ajax({
            type: "POST", 
            url:  window.server + "chofer/obtener_chofer.php",
            data: ({
                id: window.viaje_id
            }),
            cache: false,
            dataType: "text",
            success: function(data){
                if (data != 'Error') {
                    var obj = $.parseJSON(data);
                    $.each(obj.chofer, function(i,persona){
                        $("#nombre").html(persona.nombre+' '+persona.apellido);
                    });
                }else{
                    obtenerPasajero();
                }
            }
        }).fail( function() {

                //alert( 'Comprueba tu conexión a internet e intenta de nuevo' );
                myApp.alert('Comprueba tu conexión a internet', '¡Atención!');
                obtenerChofer();
            });//fin de ajax
    }

    function calificar(){
        
            var id = generateUUID();
            $.ajax({
                type: "POST", 
                url:  window.server + "pasajeros/termina_viaje.php",
                data: ({
                    id: id,
                    viaje_id: window.viaje_id,
                    calificacion: $("#calificacion").rateYo("rating"),
                }),
                cache: false,
                dataType: "text",
                success: function(data){
                    if (data) {
                        myApp.alert("Calificación emitida con éxito", "¡Atención!");
                        mainView.router.loadPage('view/Viajes/Index.html');
                    }else{
                        calificar();
                    }                   
                }
            }).fail( function() {

                //alert( 'Comprueba tu conexión a internet e intenta de nuevo' );
                myApp.alert('Comprueba tu conexión a internet', '¡Atención!');
                calificar();
            });//fin de ajax
        
    }

    $(function() {
        obtenerMonto();
        obtenerChofer();
        $("#calificacion").rateYo({
            starWidth: "50px",
            fullStar: true
        });
        $("#calificar").click(function() {
            calificar();
        });
    });
});