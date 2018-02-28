myApp.onPageInit('ChoferTerminaViaje', function(page) {
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
	        async: false,
	        success: function(data){
	        	if (data != 'Error') {
	        		var obj = $.parseJSON(data);
		            $.each(obj.viaje, function(i,viaje){
					    $("#tarifa").html('MX $'+viaje.monto_final);
		            });
	        	}else{
	        		myApp.alert("Error al obtener la tarifa, reintentando...", "¡Atención!");
	        		obtenerMonto();
	        	}
	        }
	    }).fail( function() {

            //alert( 'Comprueba tu conexión a internet e intenta de nuevo' );
            myApp.alert('Comprueba tu conexión a internet', '¡Atención!');
            obtenerMonto();

        });//fin de ajax
	}

	function obtenerPasajero(){
		//Obtener datos del viaje
		$.ajax({
	        type: "POST", 
	        url:  window.server + "chofer/obtener_pasajero.php",
	        data: ({
	            id: window.viaje_id
	        }),
	        cache: false,
	        dataType: "text",
	        async: false,
	        success: function(data){
	        	if (data != 'Error') {
	        		var obj = $.parseJSON(data);
		            $.each(obj.persona, function(i,persona){
					    $("#nombre").html(persona.nombre+' '+persona.apellido);
		            });
	        	}else{
	        		myApp.alert("Error al obtener datos del pasajero, reintentando...", "¡Atención!");
	        		obtenerPasajero();
	        	}
	        }
	    }).fail( function() {

            //alert( 'Comprueba tu conexión a internet e intenta de nuevo' );
            myApp.alert('Comprueba tu conexión a internet', '¡Atención!');
            obtenerPasajero();

        });//fin de ajax
	}

	function calificar(){
		
	  		var id = generateUUID();
	    	$.ajax({
		        type: "POST", 
		        url:  window.server + "chofer/termina_viaje.php",
		        data: ({
		        	id: id,
		            viaje_id: window.viaje_id,
		            calificacion: $("#calificacion").rateYo("rating"),
		            comentarios: $("#comentarios").val(),
		        }),
		        cache: false,
		        dataType: "text",
		        success: function(data){
		        	if (data) {
		        		myApp.alert("Calificación emitida con éxito", "¡Atención!");
		        		mainView.router.loadPage('view/Chofer/Index.html');
		        	}else{
		        		myApp.alert("Error al registrar calificación, reintentando...", "¡Atención!");
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
		obtenerPasajero();
		$("#calificacion").rateYo({
		    starWidth: "50px",
		    fullStar: true
	  	});
	  	$("#calificar").click(function() {
	  		calificar();
		});
	});
});