       $(function() {
          $("#borrar").click(function() {

              $.mobile.changePage( "edit.html", {
              transition: "slide",
              reverse: true,
              changeHash: true
          });

              
      });
  }); 


          $(document).on('pagebeforeshow', "#ViewPasajerosDetail",function () {
                

                parameter = window.user_id_global; 
                //alert(parameter);
                $("#showdataPasajerosDetail").html("");

                //EXTRAE LOS DATOS PERSONALES DEL ALUMNO http://localhost/taxiSeguro/php/personas/obtener_personas_por_user.php?id=26659adb-cd7a-418d-8118-96c796983931
                $.ajax({
                    url:        window.server + "personas/obtener_personas_por_user.php?id=" + parameter,
                    data:       "",
                    dataType:   "html",
                    success:    function(data,url){
                                         
                        var obj = $.parseJSON(data);
                          //
                          //alert(url);
                        var datos = "";
                          
                        $.each(obj.personas, function(i,persona){
                            persona.fnacimiento = persona.fnacimiento.split("-").reverse().join("-");
                            created2 = persona.created.split(" ");
                            persona.created = created2[0].split("-").reverse().join("-") + " " +created2[1];
                            datos =  
                            "<div class='card'><ul class='table-view'>"+
                            "<br>" +
                            "<li class='table-view-cell'><img width='200' src='" + persona.foto + "'/><br>" +
                            "<b><font size = 4>" + window.user_usuario_global + "</font></b></li></ul>"  +
                            "<ul class='table-view'>"+
                            "<li class='table-view-cell table-view-divider'/>" + 
                            "<li class='table-view-cell table-view-divider'/>" +
                            "<li class='table-view-cell'><font size = 2>Nombre: " + persona.nombre +" " +persona.apellido + "</font><br><li>"  +
                            "<li class='table-view-cell'><font size = 2>Fecha de nacimiento: " + persona.fnacimiento + "</font><br><li>"  +
                             "<li class='table-view-cell'><font size = 2>Teléfono: " + persona.telefono + "</font><br><li>"  +
                              "<li class='table-view-cell'><font size = 2>Correo: " + persona.correo + "</font><br><li>"  +
                               "<li class='table-view-cell'><font size = 2>Miembro desde: " + persona.created + "</font><br><li>"  +
                            "</ul></div>";

                           
                            // "<li class='table-view-cell'><font size = 2>Activo: " + user.activo + "</font><br></li>" +
                            // "<li class='table-view-cell'><font size = 2>Usuario desde: " +user.created + "</font><br></li>"+
                            

                          //window.user_id = user.user_id;
                          //window.alumno_id = alumno.alumno_id;

                        });//cierre de each
                        
                        //$("#showdataUsersDetail").trigger("create");
                        $("#showdataPasajerosDetail").html(datos);
                        //$("#showdata").listview("refresh");
                    }
                });//cierre de ajax                 

            });