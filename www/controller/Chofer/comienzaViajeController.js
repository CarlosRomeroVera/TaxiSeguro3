myApp.onPageInit('ChoferComienzaViaje', function(page) {
	var viaje_inicio = '';
	var marker;          //variable del marcador
    var coords = {};    //coordenadas obtenidas con la geolocalización
    var refreshIntervalId = '';
    var sync = function(){ 
		    navigator.geolocation.getCurrentPosition(
          function (position){
            coords =  position.coords.latitude + ',' + position.coords.longitude;
            //setMapa(coords);  //pasamos las coordenadas al metodo para crear el mapa
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
                    }
                }
            });//fin de ajax
            marker.setPosition(new google.maps.LatLng(position.coords.latitude,position.coords.longitude));
          
          },function(error){console.log(error);}
        );

        // $.ajax({
        //     type: "POST", 
        //     url:  window.server + "chofer/obtener_viaje.php",
        //     data: ({
        //         id: window.viaje_id
        //     }),
        //     cache: false,
        //     dataType: "text",
        //     success: function(data){
        //         var obj = $.parseJSON(data);
        //         $.each(obj.viaje, function(i,viaje){
        //           if (viaje.estado_viaje_id == 'Cancelado') {
                    
        //               $.ajax({
        //                       type: "POST", 
        //                       url:  window.server + "chofer/cambiar_estado.php",
        //                       data: ({
        //                           id: window.user_id_global,
        //                       }),
        //                       cache: false,
        //                       dataType: "text",
        //                       async: false,
        //                       success: function(data){
        //                           clearInterval(refreshIntervalId);
        //                           myApp.alert("El cliente ha cancelado el viaje debido a: "+viaje.info_adicional, "¡Atención!");
        //                           mainView.router.loadPage('view/Chofer/Index.html');
        //                       }
        //                   });//fin de ajax
        //           }
        //         });
        //     }
        // }).fail( function() {

        //       //alert( 'Comprueba tu conexión a internet e intenta de nuevo' );
        //       myApp.alert('Comprueba tu conexión a internet', '¡Atención!');

        //   });//fin de ajax
    };

	$(function() {

    function obtenerChoferDatos(){
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
                  viaje_inicio = viaje.viaje_inicio;
                  viaje_fin = viaje.viaje_fin;
                  initMap();
                  //alert(viaje.viaje_inicio);
                  //alert(viaje.monto_final);
                });
              }else{
                obtenerChoferDatos();
              }
              
          }
      }).fail( function() {

          //alert( 'Comprueba tu conexión a internet e intenta de nuevo' );
          myApp.alert('Comprueba tu conexión a internet', '¡Atención!');
          obtenerChoferDatos();

      });//fin de ajax
    }
		

	    $("#inicia").click(function() {
	    	$.ajax({
		        type: "POST", 
		        url:  window.server + "chofer/cambiar_estado_viaje.php",
		        data: ({
		            id: window.viaje_id,
		            estado: 'en curso'
		        }),
		        cache: false,
		        dataType: "text",
		        success: function(data){
		        	if (data) {
		        		$("#boton").html('<a onclick="finalizaViaje();" href="#" id="fin" name="fin" class="button button-big button-fill color-blue form-from-data"><b>Termina viaje</b></a>');

			          	refreshIntervalId = setInterval(sync, 5000);
		        	}else{
		        		myApp.alert("Error, verifica tu conexión e intenta de nuevo", "¡Atención!");
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
          var map = new google.maps.Map(document.getElementById('mapChoferComienzaViaje'),
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

          markerFin = new google.maps.Marker({
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: x2,
            title: 'FINAL',
            label: 'FIN'
          });

            var request = {
	           origin: x1,
	           destination: x2,
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

		   var lat = parseFloat(coordinatesLat2);
		   var lng = parseFloat(coordinatesLong2);
		   var latlng = new google.maps.LatLng(lat, lng);
		   var geocoder = new google.maps.Geocoder();
		   geocoder.geocode({'latLng': latlng}, function(results, status) {
		      if (status == google.maps.GeocoderStatus.OK) {
		         if (results[0]) {
		            $('#addressComienzaViaje').text(results[0].formatted_address);
		         } else {
		            alert('Dirección conocida');
		         }
		      } else {
		         alert('Geocoder falló: ' + status);
		      }
		   });
    }
});