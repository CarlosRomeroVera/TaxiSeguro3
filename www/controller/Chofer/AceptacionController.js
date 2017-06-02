myApp.onPageInit('ChoferAcepta', function(page) {
	var viaje_inicio = '';
	var marker;          //variable del marcador
    var coords = {};    //coordenadas obtenidas con la geolocalización

	$(function() {

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
				    viaje_inicio = viaje.viaje_inicio;
				    initMap();
	            	//alert(viaje.viaje_inicio);
	            	//alert(viaje.monto_final);
	            });
	        }
	    }).fail( function() {

	        //alert( 'Comprueba tu conexión a internet e intenta de nuevo' );
	        myApp.alert('Comprueba tu conexión a internet', '¡Atención!');

	    });//fin de ajax

	    $("#llego").click(function() {
	    	$.ajax({
		        type: "POST", 
		        url:  window.server + "chofer/cambiar_estado_viaje.php",
		        data: ({
		            id: window.viaje_id,
		            estado: 'Llego'
		        }),
		        cache: false,
		        dataType: "text",
		        success: function(data){
		        	if (data) {
		        		clearInterval(refreshIntervalId);
		        		mainView.router.loadPage('view/Chofer/comienzaViaje.html');
		        	}else{
		        		myApp.alert(data, "¡Atención!");
		        	}
		        }
		    }).fail( function() {

		        //alert( 'Comprueba tu conexión a internet e intenta de nuevo' );
		        myApp.alert('Comprueba tu conexión a internet e intenta de nuevo', '¡Atención!');

		    });//fin de ajax
		});
	});

	function initMap ()
    {

        //usamos la API para geolocalizar el usuario
            navigator.geolocation.getCurrentPosition(
              function (position){
                coords =  {
                  lng: position.coords.longitude,
                  lat: position.coords.latitude
                };
                setMapa(coords);  //pasamos las coordenadas al metodo para crear el mapa
                
              
              },function(error){console.log(error);});
        
    }

    function setMapa (coords)
    {  
          //Se crea una nueva instancia del objeto mapa
          var directionsDisplay = new google.maps.DirectionsRenderer();
          var directionsService = new google.maps.DirectionsService();
          var map = new google.maps.Map(document.getElementById('mapChoferAcepta'),
          {
            zoom: 13,
            center:new google.maps.LatLng(coords.lat,coords.lng),
            mapTypeId: 'terrain',
            disableDefaultUI: true
          }); 

          //bermudaTriangle.setMap(map);
     
          //Creamos el marcador en el mapa con sus propiedades
          //para nuestro obetivo tenemos que poner el atributo draggable en true
          //position pondremos las mismas coordenas que obtuvimos en la geolocalización
          marker = new google.maps.Marker({
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(coords.lat,coords.lng),
            title: 'INICIO',
            label: 'INI.'
          });

          var commaPos1 = viaje_inicio.indexOf(',');
          var coordinatesLat1 = parseFloat(viaje_inicio.substring(0, commaPos1));
          var coordinatesLong1 = parseFloat(viaje_inicio.substring(commaPos1 + 1, viaje_inicio.length));
          var x1 = new google.maps.LatLng(coordinatesLat1, coordinatesLong1);

          markerFin = new google.maps.Marker({
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: x1,
            title: 'FIN',
            label: 'FIN'
          });

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
	                markerFin.setIcon(window.url + "www/webroot/img/person.png");
	            } else {
	                myApp.alert("No existen rutas entre ambos puntos", "¡Atención!");
	            }
	        });

		   var lat = parseFloat(coordinatesLat1);
		   var lng = parseFloat(coordinatesLong1);
		   var latlng = new google.maps.LatLng(lat, lng);
		   var geocoder = new google.maps.Geocoder();
		   geocoder.geocode({'latLng': latlng}, function(results, status) {
		      if (status == google.maps.GeocoderStatus.OK) {
		         if (results[0]) {
		            $('#address').text(results[0].formatted_address);
		         } else {
		            alert('Dirección conocida');
		         }
		      } else {
		         alert('Geocoder falló: ' + status);
		      }
		   });

		   var sync = function(){ 
		   		navigator.geolocation.getCurrentPosition(
	              function (position){
	                coords =  {
	                  lng: position.coords.longitude,
	                  lat: position.coords.latitude
	                };
	                //setMapa(coords);  //pasamos las coordenadas al metodo para crear el mapa
	                marker.setPosition(new google.maps.LatLng(coords.lat,coords.lng));
	              
	              },function(error){console.log(error);});

		   };

          refreshIntervalId = setInterval(sync, 5000);
    }
});