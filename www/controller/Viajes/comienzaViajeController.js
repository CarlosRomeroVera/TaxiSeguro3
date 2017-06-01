myApp.onPageInit('PasajeroComienzaViaje', function(page) {
	var viaje_inicio = '';
	var marker;          //variable del marcador
    var coords = {};    //coordenadas obtenidas con la geolocalización
    var refreshIntervalId = '';
    var notifica = 0;
    var sync = function(){ 
		$.ajax({
	        type: "POST", 
	        url:  window.server + "chofer/obtener_chofer_coord.php",
	        data: ({
	            id: window.viaje_id
	        }),
	        cache: false,
	        dataType: "text",
	        async: false,
	        success: function(data){
	            var commaPos1 = data.indexOf(',');
	          	var coordinatesLat1 = parseFloat(data.substring(0, commaPos1));
	          	var coordinatesLong1 = parseFloat(data.substring(commaPos1 + 1, data.length));
	          	var x1 = new google.maps.LatLng(coordinatesLat1, coordinatesLong1);
			    marker.setPosition(x1);
	        }
	    }).fail( function() {

                //alert( 'Comprueba tu conexión a internet e intenta de nuevo' );
                myApp.alert('Comprueba tu conexión a internet', '¡Atención!');
            });//fin de ajax

	    $.ajax({
	        type: "POST", 
	        url:  window.server + "chofer/obtener_viaje.php",
	        data: ({
	            id: window.viaje_id
	        }),
	        cache: false,
	        dataType: "text",
	        success: function(data){
	            var obj = $.parseJSON(data);
	            $.each(obj.viaje, function(i,viaje){
	            	if (viaje.estado_viaje_id == 'Llego' && notifica == 0) {
				    	//clearInterval(refreshIntervalId);
                        //mainView.router.loadPage('view/Pasajeros/comienzaViaje.html');
                        myApp.alert("El chofer ha llegado por usted, porfavor aborde el taxi", "¡Atención!");
                        notifica = 1;
				    }else if (viaje.estado_viaje_id == 'en curso') {
				    	clearInterval(refreshIntervalId);
                        mainView.router.loadPage('view/Pasajeros/comienzaViaje.html');
				    }
	            });
	        }
	    });//fin de ajax
    };

    function obtenerViajeChofer(){
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
	            var obj = $.parseJSON(data);
	            $.each(obj.viaje, function(i,viaje){
				    viaje_inicio = viaje.viaje_inicio;
				    viaje_fin = viaje.viaje_fin;
				    initMap();
	            });
	        }
	    }).fail( function() {

                //alert( 'Comprueba tu conexión a internet e intenta de nuevo' );
                myApp.alert('Comprueba tu conexión a internet', '¡Atención!');
                obtenerViajeChofer();
            });//fin de ajax
    }

	$(function() {

		obtenerViajeChofer();
	});

	function initMap ()
    {

        //usamos la API para geolocalizar el usuario
            navigator.geolocation.getCurrentPosition(
              function (position){
              	$.ajax({
			        type: "POST", 
			        url:  window.server + "chofer/obtener_chofer_coord.php",
			        data: ({
			            id: window.viaje_id
			        }),
			        cache: false,
			        dataType: "text",
			        success: function(data){
			            var commaPos1 = data.indexOf(',');
			          	var coordinatesLat1 = parseFloat(data.substring(0, commaPos1));
			          	var coordinatesLong1 = parseFloat(data.substring(commaPos1 + 1, data.length));
			          	//var x1 = new google.maps.LatLng(coordinatesLat1, coordinatesLong1);
					    //marker.setPosition(x1);
					    coords =  {
		                  lng: coordinatesLong1,
		                  lat: coordinatesLat1
		                };
		                setMapa(coords);  //pasamos las coordenadas al metodo para crear el mapa
			        }
			    });//fin de ajax
                
                
              
              },function(error){console.log(error);});
        
    }

    function setMapa (coords)
    {  
          //Se crea una nueva instancia del objeto mapa
          var directionsDisplay = new google.maps.DirectionsRenderer();
          var directionsService = new google.maps.DirectionsService();
          var map = new google.maps.Map(document.getElementById('mapPasajeroComienzaViaje'),
          {
            zoom: 13,
            center:new google.maps.LatLng(coords.lat,coords.lng),
            mapTypeId: 'terrain',
            disableDefaultUI: true
          }); 

          marker = new google.maps.Marker({
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(coords.lat,coords.lng),
            title: 'Taxi',
            label: 'Tax.'
          });

          var commaPos1 = viaje_inicio.indexOf(',');
          var coordinatesLat1 = parseFloat(viaje_inicio.substring(0, commaPos1));
          var coordinatesLong1 = parseFloat(viaje_inicio.substring(commaPos1 + 1, viaje_inicio.length));
          var x1 = new google.maps.LatLng(coordinatesLat1, coordinatesLong1);

          var commaPos2 = viaje_fin.indexOf(',');
          var coordinatesLat2 = parseFloat(viaje_fin.substring(0, commaPos2));
          var coordinatesLong2 = parseFloat(viaje_fin.substring(commaPos2 + 1, viaje_fin.length));
          var x2 = new google.maps.LatLng(coordinatesLat2, coordinatesLong2);

          markerInicio = new google.maps.Marker({
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: x1,
            title: 'INICIO',
            label: 'INI'
          });

          // markerFin = new google.maps.Marker({
          //   map: map,
          //   draggable: true,
          //   animation: google.maps.Animation.DROP,
          //   position: x2,
          //   title: 'FINAL',
          //   label: 'FIN'
          // });

            var request = {
	           origin: new google.maps.LatLng(coords.lat,coords.lng),
	           destination: x1,
	           travelMode: google.maps.DirectionsTravelMode['DRIVING'],
	           unitSystem: google.maps.DirectionsUnitSystem['METRIC'],
	           provideRouteAlternatives: true
	        };

	        directionsService.route(request, function(response, status) {
	            if (status == google.maps.DirectionsStatus.OK) {
	                directionsDisplay.setMap(map);
	                directionsDisplay.setOptions( { suppressMarkers: true } );
	                /*directionsDisplay.setPanel($("#panel_ruta").get(0));*/
	                directionsDisplay.setDirections(response);
	                marker.setIcon(window.url + "www/webroot/img/coche.png");
	                markerInicio.setIcon(window.url + "www/webroot/img/person.png");

	            } else {
	                myApp.alert("No existen rutas entre ambos puntos", "¡Atención!");
	            }
	        });

	        function obtiene_chofer(){
	        	$.ajax({
			        type: "POST", 
			        url:  window.server + "chofer/obtener_chofer.php",
			        data: ({
			            id: window.viaje_id
			        }),
			        cache: false,
			        dataType: "text",
			        async: false,
			        success: function(data){
			        	//alert(data);
			        	if (data != 'Error') {
			        		var obj = $.parseJSON(data);
				            $.each(obj.chofer, function(i,chofer){
				            	document.getElementById('fotoChofer').setAttribute( 'src', chofer.foto );
				            	$('#chofer').html('Nombre: '+chofer.nombre+" "+chofer.apellido+'<br>Teléfono: '+chofer.telefono);
				            });
			        	}else{
			        		obtiene_chofer();
			        	}
			          
			        }
			    }).fail( function() {

	                //alert( 'Comprueba tu conexión a internet e intenta de nuevo' );
	                myApp.alert('Comprueba tu conexión a internet', '¡Atención!');
	                obtiene_chofer();
	            });//fin de ajax
	        }
	        obtiene_chofer();
	        refreshIntervalId = setInterval(sync, 5000);
    }
});