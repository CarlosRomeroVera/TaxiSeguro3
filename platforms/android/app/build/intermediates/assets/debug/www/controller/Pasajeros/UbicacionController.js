myApp.onPageInit('PasajeroUbicacion', function(page) { 
    //google.maps.visualRefresh = true;
    /*var parameters = $(this).data("url").split("?")[1];
    parameter = parameters.replace("tipo=",""); 
    document.getElementById("tipo").value = parameter;*/
    //CleanUp();
    var marker;          //variable del marcador
    var coords = {};    //coordenadas obtenidas con la geolocalización
    initMap();

    //Funcion principal
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
          var map = new google.maps.Map(document.getElementById('mapUbi'),
          {
            zoom: 13,
            center:new google.maps.LatLng(coords.lat,coords.lng),
            mapTypeId: 'terrain',
            disableDefaultUI: true
          }); 

          document.getElementById("lat").value = coords.lat;
          document.getElementById("lon").value = coords.lng;

          //bermudaTriangle.setMap(map);
     
          //Creamos el marcador en el mapa con sus propiedades
          //para nuestro obetivo tenemos que poner el atributo draggable en true
          //position pondremos las mismas coordenas que obtuvimos en la geolocalización
          marker = new google.maps.Marker({
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(coords.lat,coords.lng),
      
          });

          //agregamos un evento al marcador junto con la funcion callback al igual que el evento dragend que indica
          //cuando el usuario a soltado el marcador
          //marker.addListener('click', toggleBounce);
          
          marker.addListener( 'dragend', function (event)
          {
            //escribimos las coordenadas de la posicion actual del marcador dentro del input #coords

            document.getElementById("lat").value = this.getPosition().lat();
            document.getElementById("lon").value = this.getPosition().lng();

            /*if (google.maps.geometry.poly.containsLocation(new google.maps.LatLng(this.getPosition().lat(), this.getPosition().lng()), bermudaTriangle)) {
              alert('dentro');
            }else{
              alert('fuera');
            }*/
          });
    }

    $(function() {

        $("#guardarUbicacion").click(function() {
          var id = window.user_id_global;
          var tipo = window.tipo;
          var lat = document.getElementById('lat').value;
          var lon = document.getElementById('lon').value;

          document.getElementById('lat').value = '';
          document.getElementById('lon').value = '';

          $.ajax({
              type: "POST", 
              url:  window.server + "pasajeros/agregar_ubicacion.php",
              data: ({
                  id : id,
                  tipo: tipo,
                  lat: lat,
                  lon: lon
              }),
            
              cache: false,
              dataType: "text",
              success: EnviamosContinuar
          }).fail( function() {

                //alert( 'Comprueba tu conexión a internet e intenta de nuevo' );
                myApp.alert('Comprueba tu conexión a internet e intenta de nuevo', '¡Atención!');
            });//fin de ajax
        });
            
        function EnviamosContinuar(data){      
            myApp.alert(data, '¡Atención!');
        }
    }); 

});
