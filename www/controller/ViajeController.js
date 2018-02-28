myApp.onPageInit('ViajesIndex', function(page) { 

    var x = 0;
    //alert('entrando viajes');
    var marker;          //variable del marcador
    var coords = {};    //coordenadas obtenidas con la geolocalización
    var latlngInicio = '';
    var latlngFinal = '';
    var tarifaId = '';
    var excluded = new Array();

    
    //Funcion principal
    function initMap()
    {   

            var onSuccess = function(position) {
            };

            // onError Callback receives a PositionError object
            //
            function onError(error) {
                alert('code: '    + error.code    + '\n' +
                      'message: ' + error.message + '\n');
            }

            navigator.geolocation.getCurrentPosition(onSuccess, onError);

        //usamos la API para geolocalizar el usuario
            navigator.geolocation.getCurrentPosition(
              function (position){
                coords =  {
                  lng: position.coords.longitude,
                  lat: position.coords.latitude
                };
                //alert(coords);
                setMapa(coords);  //pasamos las coordenadas al metodo para crear el mapa
                
              
              },function(error){alert(error);});
        
    }
     
     
     
    function setMapa (coords)
    {  
        //alert('dibujando mapa');
        var directionsDisplay = new google.maps.DirectionsRenderer();
        var directionsService = new google.maps.DirectionsService();
          //Se crea una nueva instancia del objeto mapa
          var map = new google.maps.Map(document.getElementById('map'),
          {
            zoom: 14,
            center:new google.maps.LatLng(coords.lat,coords.lng),
            mapTypeId: 'terrain',
            disableDefaultUI: true
          }); 

          var expofer = new google.maps.Polygon({
            paths: [
              new google.maps.LatLng(18.512338, -88.356998),
              new google.maps.LatLng(18.508378, -88.346579),
              new google.maps.LatLng(18.517351, -88.343972),
              new google.maps.LatLng(18.516771, -88.349766),
            ],
              strokeColor: '#5858FA',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#5858FA',
              fillOpacity: 0.35,
              name: 'EXPOFER'
          });

          var clinicadelamujer = new google.maps.Polygon({
            paths: [
              new google.maps.LatLng(18.507868, -88.346133),
              new google.maps.LatLng(18.507044, -88.346439),
              new google.maps.LatLng(18.504476, -88.340109),
              new google.maps.LatLng(18.506236, -88.339637),
            ],
              strokeColor: '#FA58F4',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#FA58F4',
              fillOpacity: 0.35,
              name: 'CLINICA DE LA MUJER'
          });

          var foviste5etapa = new google.maps.Polygon({
            paths: [
              new google.maps.LatLng(18.50623, -88.3395),
              new google.maps.LatLng(18.50451, -88.34003),
              new google.maps.LatLng(18.50321, -88.33836),
              new google.maps.LatLng(18.50105, -88.33776),
              new google.maps.LatLng(18.50284, -88.33703),
              new google.maps.LatLng(18.50122, -88.33085),
              new google.maps.LatLng(18.49987, -88.33042),
              new google.maps.LatLng(18.49899, -88.32957),
              new google.maps.LatLng(18.50029, -88.32717),
              new google.maps.LatLng(18.49873, -88.32561),
              new google.maps.LatLng(18.49837, -88.32261),
              new google.maps.LatLng(18.5018, -88.32148),
            ],
              strokeColor: '#58D3F7',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#58D3F7',
              fillOpacity: 0.35,
              name: 'FOVISSSTE 5A° ETAPA'
          });

          var dina = new google.maps.Polygon({
            paths: [
              new google.maps.LatLng(18.50179, -88.32145),
              new google.maps.LatLng(18.49837, -88.32261),
              new google.maps.LatLng(18.4985, -88.31398),
              new google.maps.LatLng(18.49983, -88.3138),
            ],
              strokeColor: '#4000FF',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#4000FF',
              fillOpacity: 0.35,
              name: 'DINA'
          });

          var centro = new google.maps.Polygon({
            paths: [
              new google.maps.LatLng(18.49588, -88.31411),
              new google.maps.LatLng(18.5017, -88.31389),
              new google.maps.LatLng(18.50399, -88.31586),
              new google.maps.LatLng(18.5048, -88.31575),
              new google.maps.LatLng(18.50328, -88.30623),
              new google.maps.LatLng(18.50239, -88.29576),
              new google.maps.LatLng(18.50153, -88.29591),
              new google.maps.LatLng(18.50042, -88.28381),
              new google.maps.LatLng(18.49949, -88.28345),
              new google.maps.LatLng(18.49404, -88.28553),
              new google.maps.LatLng(18.49079, -88.29937),
            ],
              strokeColor: '#08088A',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#08088A',
              fillOpacity: 0.35,
              name: 'CENTRO'
          });

          var aeropuerto = new google.maps.Polygon({
            paths: [
              new google.maps.LatLng(18.51444, -88.34462),
              new google.maps.LatLng(18.50846, -88.34651),
              new google.maps.LatLng(18.50007, -88.31395),
              new google.maps.LatLng(18.50183, -88.31411),
              new google.maps.LatLng(18.50399, -88.31586),
              new google.maps.LatLng(18.50508, -88.31853),
              new google.maps.LatLng(18.50793, -88.31913),
            ],
              strokeColor: '#01A9DB',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#01A9DB',
              fillOpacity: 0.35,
              name: 'AEROPUERTO'
          });

          var marsella = new google.maps.Polygon({
            paths: [
              new google.maps.LatLng(18.51752, -88.34361),
              new google.maps.LatLng(18.51698, -88.3436),
              new google.maps.LatLng(18.51444, -88.34446),
              new google.maps.LatLng(18.51343, -88.34054),
              new google.maps.LatLng(18.51412, -88.34057),
              new google.maps.LatLng(18.51771, -88.33973),
            ],
              strokeColor: '#FE2E9A',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#FE2E9A',
              fillOpacity: 0.35,
              name: 'RESIDENCIAL MARSELLA'
          });

          var forjadores = new google.maps.Polygon({
            paths: [
              new google.maps.LatLng(18.51771, -88.33969),
              new google.maps.LatLng(18.51411, -88.34052),
              new google.maps.LatLng(18.51343, -88.34053),
              new google.maps.LatLng(18.51062, -88.32956),
              new google.maps.LatLng(18.51822, -88.3298),
            ],
              strokeColor: '#0B3861',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#0B3861',
              fillOpacity: 0.35,
              name: 'FORJADORES'
          });

          var jardines = new google.maps.Polygon({
            paths: [
              new google.maps.LatLng(18.51822, -88.32979),
              new google.maps.LatLng(18.51061, -88.32955),
              new google.maps.LatLng(18.50797, -88.31912),
              new google.maps.LatLng(18.51061, -88.31824),
              new google.maps.LatLng(18.51882, -88.3187),
            ],
              strokeColor: '#688A08',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#688A08',
              fillOpacity: 0.35,
              name: 'JARDINES'
          });

          var ochodeoctubre = new google.maps.Polygon({
            paths: [
              new google.maps.LatLng(18.51882, -88.31869),
              new google.maps.LatLng(18.51061, -88.31823),
              new google.maps.LatLng(18.50793, -88.31912),
              new google.maps.LatLng(18.50509, -88.31852),
              new google.maps.LatLng(18.50402, -88.31588),
              new google.maps.LatLng(18.50481, -88.31577),
              new google.maps.LatLng(18.50387, -88.30987),
              new google.maps.LatLng(18.51934, -88.30828),
            ],
              strokeColor: '#04B45F',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#04B45F',
              fillOpacity: 0.35,
              name: '8 DE OCTUBRE'
          });

          var casitas = new google.maps.Polygon({
            paths: [
              new google.maps.LatLng(18.51934, -88.30827),
              new google.maps.LatLng(18.50387, -88.30986),
              new google.maps.LatLng(18.5033, -88.30623),
              new google.maps.LatLng(18.50257, -88.29781),
              new google.maps.LatLng(18.51994, -88.29578),
            ],
              strokeColor: '#088A08',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#088A08',
              fillOpacity: 0.35,
              name: 'LAS CASITAS'
          });

          var lopezmateos = new google.maps.Polygon({
            paths: [
              new google.maps.LatLng(18.51994, -88.29577),
              new google.maps.LatLng(18.50257, -88.2978),
              new google.maps.LatLng(18.50239, -88.29576),
              new google.maps.LatLng(18.50154, -88.2959),
              new google.maps.LatLng(18.50045, -88.28382),
              new google.maps.LatLng(18.50416, -88.28047),
              new google.maps.LatLng(18.51144, -88.27654),
              new google.maps.LatLng(18.51975, -88.29096),
              new google.maps.LatLng(18.52011, -88.29247),
            ],
              strokeColor: '#01A9DB',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#01A9DB',
              fillOpacity: 0.35,
              name: 'LOPEZ MATEOS'
          });

          var cincodeabril = new google.maps.Polygon({
            paths: [
              new google.maps.LatLng(18.53063, -88.27992),
              new google.maps.LatLng(18.51856, -88.28886),
              new google.maps.LatLng(18.51147, -88.27653),
              new google.maps.LatLng(18.51646, -88.26928),
              new google.maps.LatLng(18.52318, -88.26637),
            ],
              strokeColor: '#086A87',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#086A87',
              fillOpacity: 0.35,
              name: '5 DE ABRIL'
          });

          var proterritorio = new google.maps.Polygon({
            paths: [
              new google.maps.LatLng(18.53185, -88.2958),
              new google.maps.LatLng(18.52382, -88.29534),
              new google.maps.LatLng(18.51996, -88.29578),
              new google.maps.LatLng(18.52014, -88.29248),
              new google.maps.LatLng(18.51977, -88.29094),
              new google.maps.LatLng(18.51857, -88.28887),
              new google.maps.LatLng(18.52691, -88.28271),
              new google.maps.LatLng(18.52818, -88.28498),
              new google.maps.LatLng(18.52823, -88.28539),
              new google.maps.LatLng(18.53227, -88.28554),
            ],
              strokeColor: '#F4FA58',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#F4FA58',
              fillOpacity: 0.35,
              name: 'PROTERRITORIO'
          });

          var solidaridad = new google.maps.Polygon({
            paths: [
              new google.maps.LatLng(18.53144, -88.30829),
              new google.maps.LatLng(18.5234, -88.30797),
              new google.maps.LatLng(18.52321, -88.30799),
              new google.maps.LatLng(18.52243, -88.3081),
              new google.maps.LatLng(18.51978, -88.30837),
              new google.maps.LatLng(18.51937, -88.30829),
              new google.maps.LatLng(18.51996, -88.2958),
              new google.maps.LatLng(18.52383, -88.29537),
              new google.maps.LatLng(18.53186, -88.29584),
              new google.maps.LatLng(18.53179, -88.29674),
              new google.maps.LatLng(18.53167, -88.30136),
              new google.maps.LatLng(18.53161, -88.30276),
              new google.maps.LatLng(18.53162, -88.30401),
              new google.maps.LatLng(18.53154, -88.30749),
            ],
              strokeColor: '#0B6121',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#0B6121',
              fillOpacity: 0.35,
              name: 'SOLIDARIDAD'
          });

          var magisterial = new google.maps.Polygon({
            paths: [
              new google.maps.LatLng(18.53002, -88.31933),
              new google.maps.LatLng(18.51885, -88.3187),
              new google.maps.LatLng(18.51939, -88.30831),
              new google.maps.LatLng(18.51979, -88.30838),
              new google.maps.LatLng(18.52245, -88.30812),
              new google.maps.LatLng(18.52321, -88.308),
              new google.maps.LatLng(18.52331, -88.30797),
              new google.maps.LatLng(18.53143, -88.3083),
            ],
              strokeColor: '#58FA58',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#58FA58',
              fillOpacity: 0.35,
              name: 'MAGISTERIAL'
          });

          var payobispo = new google.maps.Polygon({
            paths: [
              new google.maps.LatLng(18.53001, -88.31934),
              new google.maps.LatLng(18.52979, -88.32101),
              new google.maps.LatLng(18.52942, -88.32416),
              new google.maps.LatLng(18.52935, -88.325),
              new google.maps.LatLng(18.52864, -88.33016),
              new google.maps.LatLng(18.51827, -88.3298),
              new google.maps.LatLng(18.51883, -88.31871),
            ],
              strokeColor: '#FF0040',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#FF0040',
              fillOpacity: 0.35,
              name: 'PAYO OBISPO'
          });

          var lagunitas = new google.maps.Polygon({
            paths: [
              new google.maps.LatLng(18.52864, -88.33016),
              new google.maps.LatLng(18.52826, -88.33428),
              new google.maps.LatLng(18.51759, -88.34361),
              new google.maps.LatLng(18.51829, -88.32982),
            ],
              strokeColor: '#088A29',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#088A29',
              fillOpacity: 0.35,
              name: 'LAGUNITAS-LOS MONOS'
          });

          var nuevoprogreso = new google.maps.Polygon({
            paths: [
              new google.maps.LatLng(18.5366, -88.32456),
              new google.maps.LatLng(18.52903, -88.32732),
              new google.maps.LatLng(18.53034, -88.31657),
              new google.maps.LatLng(18.53101, -88.31657),
              new google.maps.LatLng(18.53113, -88.31572),
              new google.maps.LatLng(18.53768, -88.31653),
            ],
              strokeColor: '#848484',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#848484',
              fillOpacity: 0.35,
              name: 'NUEVO PROGRESO'
          });

          var lazarocardenas = new google.maps.Polygon({
            paths: [
              new google.maps.LatLng(18.53768, -88.31653),
              new google.maps.LatLng(18.53112, -88.31571),
              new google.maps.LatLng(18.53101, -88.31655),
              new google.maps.LatLng(18.53036, -88.31655),
              new google.maps.LatLng(18.53146, -88.3083),
              new google.maps.LatLng(18.53156, -88.30749),
              new google.maps.LatLng(18.53163, -88.30401),
              new google.maps.LatLng(18.53163, -88.30276),
              new google.maps.LatLng(18.53169, -88.30136),
              new google.maps.LatLng(18.53181, -88.29675),
              new google.maps.LatLng(18.53189, -88.29584),
              new google.maps.LatLng(18.53828, -88.29604),
            ],
              strokeColor: '#0174DF',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#0174DF',
              fillOpacity: 0.35,
              name: 'LAZARO CARDENAS'
          });

          var arboledas = new google.maps.Polygon({
            paths: [
              new google.maps.LatLng(18.53666, -88.29596),
              new google.maps.LatLng(18.53187, -88.29581),
              new google.maps.LatLng(18.53231, -88.28553),
              new google.maps.LatLng(18.52824, -88.28537),
              new google.maps.LatLng(18.52819, -88.28498),
              new google.maps.LatLng(18.52692, -88.28269),
              new google.maps.LatLng(18.53066, -88.27995),
              new google.maps.LatLng(18.53382, -88.27744),
              new google.maps.LatLng(18.53741, -88.28414),
              new google.maps.LatLng(18.53708, -88.28586),
            ],
              strokeColor: '#BF00FF',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#BF00FF',
              fillOpacity: 0.35,
              name: 'ARBOLEDAS'
          });

          var caribe = new google.maps.Polygon({
            paths: [
              new google.maps.LatLng(18.54728, -88.30838),
              new google.maps.LatLng(18.53793, -88.30807),
              new google.maps.LatLng(18.5383, -88.29603),
              new google.maps.LatLng(18.53671, -88.29596),
              new google.maps.LatLng(18.53672, -88.29575),
              new google.maps.LatLng(18.54784, -88.29115),
            ],
              strokeColor: '#40FF00',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#40FF00',
              fillOpacity: 0.35,
              name: 'CARIBE'
          });

          var americasunoydos = new google.maps.Polygon({
            paths: [
              new google.maps.LatLng(18.54643, -88.2917),
              new google.maps.LatLng(18.54333, -88.28708),
              new google.maps.LatLng(18.55328, -88.27975),
              new google.maps.LatLng(18.55775, -88.28722),
              new google.maps.LatLng(18.54782, -88.29107),
            ],
              strokeColor: '#FE2E64',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#FE2E64',
              fillOpacity: 0.35,
              name: 'AMERICAS I y II'
          });

          var americastresycuatro = new google.maps.Polygon({
            paths: [
              new google.maps.LatLng(18.56949, -88.28259),
              new google.maps.LatLng(18.5578, -88.28725),
              new google.maps.LatLng(18.55333, -88.27975),
              new google.maps.LatLng(18.56106, -88.27263),
            ],
              strokeColor: '#0B614B',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#0B614B',
              fillOpacity: 0.35,
              name: 'AMERICAS III y IV'
          });

          var pactobrero = new google.maps.Polygon({
            paths: [
              new google.maps.LatLng(18.55578, -88.27737),
              new google.maps.LatLng(18.54333, -88.287),
              new google.maps.LatLng(18.53741, -88.27491),
              new google.maps.LatLng(18.54585, -88.26858),
              new google.maps.LatLng(18.54093, -88.26162),
              new google.maps.LatLng(18.54551, -88.25916),
            ],
              strokeColor: '#01A9DB',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#01A9DB',
              fillOpacity: 0.35,
              name: 'PACTO OBRERO'
          });

          var santamaria = new google.maps.Polygon({
            paths: [
              new google.maps.LatLng(18.54122, -88.27203),
              new google.maps.LatLng(18.53738, -88.27485),
              new google.maps.LatLng(18.53351, -88.27736),
              new google.maps.LatLng(18.52974, -88.27059),
              new google.maps.LatLng(18.53795, -88.26515),
            ],
              strokeColor: '#4B088A',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#4B088A',
              fillOpacity: 0.35,
              name: 'SANTA MARIA'
          });

          var calderitas = new google.maps.Polygon({
            paths: [
              new google.maps.LatLng(18.56717, -88.26218),
              new google.maps.LatLng(18.54974, -88.26639),
              new google.maps.LatLng(18.54547, -88.25875),
              new google.maps.LatLng(18.56154, -88.24465),
            ],
              strokeColor: '#04B431',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#04B431',
              fillOpacity: 0.35,
              name: 'CALDERITAS'
          });

          var poly = [expofer, clinicadelamujer, foviste5etapa, dina, centro, aeropuerto, marsella, forjadores, jardines, ochodeoctubre, casitas, lopezmateos, 
          cincodeabril, proterritorio, solidaridad, magisterial, payobispo, lagunitas, nuevoprogreso, lazarocardenas, arboledas, caribe, americasunoydos, 
          americastresycuatro, pactobrero, santamaria, calderitas];

          for (var i = poly.length - 1; i >= 0; i--) {
            poly[i].setMap(map);
          }
     
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

          markerFin = new google.maps.Marker({
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(coords.lat,coords.lng+0.01),
            title: 'FIN',
            label: 'FIN'
          });

          //agregamos un evento al marcador junto con la funcion callback al igual que el evento dragend que indica
          //cuando el usuario a soltado el marcador
          //marker.addListener('click', toggleBounce);
          //markerFin.addListener('click', toggleBounce);

          var latInicio = coords.lat;
          var lngInicio = coords.lng;
          var zonaInicio = '' ;
          for (var i = poly.length - 1; i >= 0; i--) {
            if (google.maps.geometry.poly.containsLocation(new google.maps.LatLng(latInicio, lngInicio), poly[i])) {
                zonaInicio = poly[i].name;
                break;
            }
          }
          latlngInicio = new google.maps.LatLng(latInicio, lngInicio);
          var latFinal = '';
          var lngFinal = '';
          var zonaFinal = '' ;
          
          marker.addListener( 'dragend', function (event)
          {
            //escribimos las coordenadas de la posicion actual del marcador dentro del input #coords

            latInicio = this.getPosition().lat();
            lngInicio = this.getPosition().lng();
            latlngInicio = this.getPosition();

            for (var i = poly.length - 1; i >= 0; i--) {
              if (google.maps.geometry.poly.containsLocation(new google.maps.LatLng(this.getPosition().lat(), this.getPosition().lng()), poly[i])) {
                  zonaInicio = poly[i].name;
                  break;
              }
            }
            
          });

          markerFin.addListener( 'dragend', function (event)
          {
            $( "#SolicitarViaje" ).prop( "disabled", false );
            latFinal = this.getPosition().lat();
            lngFinal = this.getPosition().lng();
            latlngFinal = this.getPosition();
            for (var i = poly.length - 1; i >= 0; i--) {
              if (google.maps.geometry.poly.containsLocation(new google.maps.LatLng(this.getPosition().lat(), this.getPosition().lng()), poly[i])) {
                  //alert(poly[i].name);
                  zonaFinal = poly[i].name;
                  $.ajax({
                      type: "POST", 
                      url:  window.server + "viajes/obtener_tarifa.php",
                      data: ({
                          zonaInicio : zonaInicio,
                          zonaFinal: zonaFinal,
                      }),
                    
                      cache: false,
                      dataType: "text",
                      success: function(data){
                      /*marker.setMap(null);
                      markerFin.setMap(null);*/
                        var respuesta = data.split(",");
                        document.getElementById('costo').value = respuesta[0];
                        tarifaId = respuesta[1];
                        if (tarifaId == '' || tarifaId == null) {
                          tarifaId = '1aa05bb9-41a0-11e7-b246-e8039a20fb5d';
                        }
                        //alert(tarifaId);
                        var request = {
                           origin: latlngInicio,
                           destination: latlngFinal,
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
                                markerFin.setIcon(window.url + "www/webroot/img/meta.png");

                            } else {
                                    myApp.alert("No existen rutas entre ambos puntos", "¡Atención!");
                            }
                        });
                        //break;
                      }
                  }).fail( function() {

                      //alert( 'Comprueba tu conexión a internet e intenta de nuevo' );
                      myApp.alert('Comprueba tu conexión a internet e intenta arrastrar el marcador final de nuevo', '¡Atención!');
                  });//fin de ajax
                  //break;
              }
            }

          });
    }

    $(function() {
        $( "#SolicitarViaje" ).prop( "disabled", true );
        //$("#SolicitarViaje").attr("disabled", true);
        var id = generateUUID();
        var pasajero_id = '';
        var estado_viaje_id = '';
        var viaje_inicio = '';
        var viaje_fin = '';
        var tarifa_id = '';
        var monto_final = "";
        solicitudInterval = '';

        //MÉTODO SÓLO PARA GUARDAR UN TAXI, SE PUEDE REUTILIZAR MUCHO CÓDIGO CON EL MÉTODO CONTINUAR
        $("#SolicitarViaje").click(function() {
          $( "#SolicitarViaje" ).prop( "disabled", true );
          $('#carga').html('<div class="cssload-container"><div class="cssload-whirlpool"></div></div>');
          //window.persona_id = 'cad9c124-233a-11e7-9a8e-e8039a20fb5d';
          id = generateUUID();
          pasajero_id = window.user_id_global;
          estado_viaje_id = 'En espera';
          viaje_inicio = latlngInicio.toString();
          viaje_inicio = viaje_inicio.replace("(","")
          viaje_inicio = viaje_inicio.replace(")","")
          viaje_fin = latlngFinal.toString();
          viaje_fin = viaje_fin.replace("(","")
          viaje_fin = viaje_fin.replace(")","")
          tarifa_id = tarifaId;
          monto_final = document.getElementById("costo").value;

          function solicita(){ 

            $.ajax({
                type: "POST", 
                url:  window.server + "viajes/solicitar_viaje.php",
                data: ({
                    id : id,
                    pasajero_id : pasajero_id,
                    estado_viaje_id: estado_viaje_id,
                    viaje_inicio: viaje_inicio,
                    viaje_fin: viaje_fin,
                    tarifa_id: tarifa_id,
                    monto_final: monto_final
                }),
              
                cache: false,
                dataType: "text",
                success: function(data){
                  if (data != 'Error') {
                    //clearInterval(interval);
                    //asignacion(data);
                    //interval = setInterval(asignacion(data), 5000);
                    obtenerChofer();
                  }else{
                    solicita();
                  }
                }
            }).fail( function() {

                //alert( 'Comprueba tu conexión a internet e intenta de nuevo' );
                myApp.alert('Comprueba tu conexión a internet', '¡Atención!');
                solicita();
            });//fin de ajax
          }

          //interval = setInterval(syncSolicita, 10000);
          solicita();
          return false;
        });

        function obtenerChofer(){
            $.ajax({
                type: "POST", 
                url:  window.server + "chofer/obtener_choferes.php",
                data: ({
                    
                }),
              
                cache: false,
                dataType: "text",
                success: function(data){
                  if (data != 'Error') {
                    //clearInterval(interval);
                    //asignacion(data);
                    //interval = setInterval(asignacion(data), 5000);
                    asignacion(data);
                  }else{
                    obtenerChofer();
                  }
                }
            }).fail( function() {

                //alert( 'Comprueba tu conexión a internet e intenta de nuevo' );
                myApp.alert('Comprueba tu conexión a internet', '¡Atención!');
                obtenerChofer();
            });//fin de ajax
          }

          function asignacion(data){
            //alert('ok');
            var obj = $.parseJSON(data);
            var cercania = new Array();
            if (jQuery.isEmptyObject(obj.choferes)) {
              //alert('vacio');
              obtenerChofer();
            }else{
              $.each(obj.choferes, function(i,chofer){
                //alert(chofer.id);
                var commaPos1 = viaje_inicio.indexOf(',');
                var coordinatesLat1 = parseFloat(viaje_inicio.substring(0, commaPos1));
                var coordinatesLong1 = parseFloat(viaje_inicio.substring(commaPos1 + 1, viaje_inicio.length));
                var x1 = new google.maps.LatLng(coordinatesLat1, coordinatesLong1);

                var commaPos2 = chofer.coor_actuales.indexOf(',');
                var coordinatesLat2 = parseFloat(chofer.coor_actuales.substring(0, commaPos2));
                var coordinatesLong2 = parseFloat(chofer.coor_actuales.substring(commaPos2 + 1, chofer.coor_actuales.length));
                var x2 = new google.maps.LatLng(coordinatesLat2, coordinatesLong2);
                var arreglo = {
                  id : chofer.id,
                  distancia : google.maps.geometry.spherical.computeDistanceBetween(x1, x2)
                }
                 if (jQuery.inArray( chofer.id, excluded ) != -1) {

                 }else{
                    cercania.push(arreglo);
                 }
                
              });

              cercania.sort(function (a, b) {
                return b.distancia - a.distancia;
              });

              if (jQuery.isEmptyObject(cercania)) {
                obtenerChofer();
              }else{
                $.ajax({
                      type: "POST", 
                      url:  window.server + "viajes/asignar_viaje.php",
                      data: ({
                          id : id,
                          chofer_id : cercania[0].id,
                          estado_viaje_id : 'Asignado'
                      }),
                    
                      cache: false,
                      dataType: "text",
                      success: function(data){
                        if (data != 'Error') {
                          //alert('Entrando');
                          //clearInterval(interval);
                          var obj = $.parseJSON(data);
                          $.each(obj.viaje, function(i,viaje){
                            window.viaje_id = viaje.id
                          });
                          myApp.alert('Chofer asignado, esperando respuesta...', "¡Atención!");
                          solicitudInterval = setInterval(syncAsigna, 5000);
                        }
                      }
                  }).fail( function() {

                        //alert( 'Comprueba tu conexión a internet e intenta de nuevo' );
                        myApp.alert('Comprueba tu conexión a internet', '¡Atención!');
                        asignacion(data);
                    });//fin de ajax
              }
            }
          }
        
            function reinicia(){
              $.ajax({
                  type: "POST", 
                  url:  window.server + "viajes/reiniciar_viaje.php",
                  data: ({
                      id : window.viaje_id
                  }),
                
                  cache: false,
                  dataType: "text",
                  success: function(data){
                    if (data == 'Error') {
                      reinicia();
                    }else{
                      obtenerChofer();
                    }
                  }
              }).fail( function() {

                    //alert( 'Comprueba tu conexión a internet e intenta de nuevo' );
                    myApp.alert('Comprueba tu conexión a internet', '¡Atención!');
                    reinicia();
                });//fin de ajax
            }

            var syncAsigna = function(){ 
              if (x < 16) {
                  x++;
                  $.ajax({
                    type: "POST", 
                    url:  window.server + "chofer/obtener_viaje.php",
                    data: ({
                        id : window.viaje_id
                    }),
                  
                    cache: false,
                    dataType: "text",
                    success: function(data){
                      if (data != 'Error') {
                        var obj = $.parseJSON(data);
                        $.each(obj.viaje, function(i,viaje){
                          if (viaje.estado_viaje_id == 'Aceptado') {
                            clearInterval(solicitudInterval);
                            $('#carga').fadeIn(1000).html('');
                            myApp.alert('El chofer aceptó, obteniendo datos de su ubicación...', "¡Atención!");
                            mainView.router.loadPage('view/Viajes/comienzaViajes.html');
                          }else if (viaje.estado_viaje_id == 'Rechazado') {
                            clearInterval(solicitudInterval);
                            myApp.alert('El chofer rechazó la petición, asignando otro chofer en línea...', "¡Atención!");
                            excluded.push(viaje.chofer_id);
                            reinicia();
                          }
                        });
                        //myApp.alert('Chofer asignado, esperando respuesta...', "¡Atención!");
                      }
                    }
                }).fail( function() {

                      //alert( 'Comprueba tu conexión a internet e intenta de nuevo' );
                      clearInterval(solicitudInterval);
                      myApp.alert('Comprueba tu conexión a internet', '¡Atención!');
                      mainView.router.loadPage('view/Viajes/Index.html');
                  });//fin de ajax
              }else{
                  $.ajax({
                    type: "POST", 
                    url:  window.server + "chofer/obtener_viaje.php",
                    data: ({
                        id : window.viaje_id
                    }),
                  
                    cache: false,
                    dataType: "text",
                    success: function(data){
                      if (data != 'Error') {
                        var obj = $.parseJSON(data);
                        $.each(obj.viaje, function(i,viaje){
                          clearInterval(solicitudInterval);
                          myApp.alert('No se obtuvo la respuesta pronta del chofer, buscando otro...', "¡Atención!");
                          excluded.push(viaje.chofer_id);
                          reinicia();
                        });
                        //myApp.alert('Chofer asignado, esperando respuesta...', "¡Atención!");
                      }
                    }
                  }).fail( function() {

                      //alert( 'Comprueba tu conexión a internet e intenta de nuevo' );
                      clearInterval(solicitudInterval);
                      myApp.alert('Comprueba tu conexión a internet', '¡Atención!');
                      mainView.router.loadPage('view/Viajes/Index.html');
                  });//fin de ajax
                  
              }
              
            };
        
    });//fin de clic solicitar

    initMap();

    $$('#panico').on('click', function(){
      myApp.confirm('Ocupas pedir auxilio?', 'Panico', function () {
        // myApp.alert('Great!');
        var ids = [];
        navigator.geolocation.getCurrentPosition(
          function (position){
            coords =  {
              lng: position.coords.longitude,
              lat: position.coords.latitude
            };
            //alert(coords);
            panico(coords);  //pasamos las coordenadas al metodo para crear el mapa
            
          
          },function(error){alert(error);});


        
      });
    });

    function panico(coords){
      $.ajax({
          type: "POST", 
          url:  window.server + "pasajeros/panico.php",
          data: ({
              id : window.user_id_global,
              uuid : generateUUID(),
              lat : coords.lat,
              lng : coords.lng,
          }),
        
          cache: false,
          dataType: "text",
          success: function(data){
            if (data != 'Error') {
              var parsed = JSON.parse(data);

              //var arr = [];

              for(var x in parsed){
                ids.push(parsed[x].gcm_regid);
              }

              //alert(ids);
              $.ajax({
                type: "POST", 
                url:  window.server + "pasajeros/obtener_detalles.php",
                data: ({
                    id : window.user_id_global
                }),
              
                cache: false,
                dataType: "text",
                async: false,
                success: function(data){
                  if (data != 'Error') {                    
                    envia(ids, data);
                  }
                }
              });//fin de ajax

              // envia(ids);
            }
          }
        }).fail( function() {

            //alert( 'Comprueba tu conexión a internet e intenta de nuevo' );
            // clearInterval(solicitudInterval);
            myApp.alert('Comprueba tu conexión a internet', '¡Atención!');
            // mainView.router.loadPage('view/Viajes/Index.html');
        });//fin de ajax
    }

    function envia(ids, nombre){
      $.ajax({
          type : 'POST',
          url : "https://fcm.googleapis.com/fcm/send",
          headers : {
              Authorization : 'key=' + 'AAAAAM9HTPc:APA91bGjssng9EoR-ypbdWG4nBp9Sa0e9lI4Ph3gEnqjz1nl9Fz6ml64PfHFVy5FbwuxtnYUZRWLwIk_eyQ8X9b5YsVOj-itFeHucLBm6ZInDA8DgQ1Bp3Qt5WAiFzwCgXBTQjM01-Uu'
          },
          contentType : 'application/json',
          dataType: 'json',
          data: JSON.stringify({"registration_ids": ids, "notification": {"title":"Auxilio!","body":nombre+" acaba de presionar el boton de panico!","sound":"default"}}),
          success : function(response) {
              console.log(response);
          },
          error : function(xhr, status, error) {
              console.log(xhr.error);
          }
      });
    }
});
