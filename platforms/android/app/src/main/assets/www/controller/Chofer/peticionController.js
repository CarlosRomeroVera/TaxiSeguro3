myApp.onPageInit('ChoferPeticion', function(page) { 
    function rechazaViaje(){
        $.ajax({
            type: "POST", 
            url:  window.server + "chofer/rechaza_viaje.php",
            data: ({
                id: window.viaje_id
            }),
            cache: false,
            dataType: "text",
            success: function(data){
                if (data) {
                    //clearInterval(refreshIntervalId);
                    myApp.alert("Considera desconectarte si estas indispuesto para viajes", "¡Atención!");
                    mainView.router.loadPage('view/Chofer/Index.html');
                }else{
                    myApp.alert(data, "¡Atención!");
                    rechazaViaje();
                }
            }
        }).fail( function() {

            //alert( 'Comprueba tu conexión a internet e intenta de nuevo' );
            myApp.alert('Comprueba tu conexión a internet e intenta de nuevo', '¡Atención!');

        });//fin de ajax
    }
    $(".demo").TimeCircles({
        start: true,
        animation: "smooth",
        total_duration: "Auto",
        count_past_zero: false,
        circle_bg_color: "#33FFF6",
        bg_width: 1,
        fg_width: 0.04,
        time: {
            Days: { show: false },
            Hours: { show: false },
            Minutes: { show: false },
            Seconds: { show: true }
        }
    });
    var sync = function(){ 
        if (x < 60) {
            x++;
        }else{
            rechazaViaje();
            //myApp.alert('Se terminó el tiempo de espera', "¡Atención!");
            //clearInterval(refreshIntervalId);
        }
    }
    var x = 0;
    var refreshIntervalId = setInterval(sync, 1000);

    function aceptaViaje(){
        $.ajax({
            type: "POST", 
            url:  window.server + "chofer/acepta_viaje.php",
            data: ({
                id: window.viaje_id
            }),
            cache: false,
            dataType: "text",
            success: function(data){
                if (data) {
                    //clearInterval(refreshIntervalId);
                    mainView.router.loadPage('view/Chofer/aceptado.html');
                }else{
                    myApp.alert(data, "¡Atención!");
                    aceptaViaje();
                }
            }
        }).fail( function() {

            //alert( 'Comprueba tu conexión a internet e intenta de nuevo' );
            myApp.alert('Comprueba tu conexión a internet e intenta de nuevo', '¡Atención!');
            aceptaViaje();

        });//fin de ajax
    }

    $(function() {
        $("#Aceptar").click(function() {
            clearInterval(refreshIntervalId);
            aceptaViaje();
        });

        $("#Rechazar").click(function() {
            clearInterval(refreshIntervalId);
            rechazaViaje();
            
        });
    });
});