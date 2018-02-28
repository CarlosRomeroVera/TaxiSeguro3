myApp.onPageInit('PasajerosAdd', function (page) {

//$$('#GuardarPasajero').on('click', function(){

//SE DESHABILITA BOTON GUARDAR PARA VERIFICACION DE USUARIO EXISTENTE
$('#GuardarPasajero').attr('disabled', true);

var Ttipousuario_id2;
    $(function() {
        Ttipousuario_id2 = '25bfe9bb-1f25-11e7-a5c1-34e6d76e4d35';

        // $(document).ready(function(){
                    // $("#showdata").html("");

                    // //OBTIENE EL ID DE TIPOPASAJERO PASA INSERTARLO AL NUEVO USUARIO

                    // Tusuario="Pasajero";
                    // data="";
                    // $.ajax({
                    //             type: "GET", 
                    //             url:        window.server + "tipousuario/obtener_tipousuario.php",
                    //             data: ({
                    //                   tipousuario: Tusuario,                                      
                    //               }),
                    //     dataType:   "html",
                    //     success:    function(data){
                        
                                         
                    //         var obj = $.parseJSON(data);
                    //         var datos = "";
                            
                    //         $.each(obj.tipousuario, function(i,tipousuario){
                    //           Ttipousuario_id2 =tipousuario.tipousuario_id;
                    //         });
                    //     }
                    // });


                    

        // }); //Termina Document.Ready

        

          /**********************************************************************/
          /**********************************************************************/
          /**********************************************************************/
          /**********************************************************************/
          /**********************************************************************/


          //
          //SE GUARDA USER->PERSONA->PASAJERO->FOTOPERSONA
          //
            $("#GuardarPasajero").click(function(e) {
                        
                        //DATOS USUARIO

                        var Tuser_id = generateUUID();
                        var Tusuario = $("#username").val();
                        var Tcontrasenia = $("#Contrasenia").val();
                        var Tcontrasenia2 = $("#Contrasenia2").val();
                        

                        // DATOS PERSONA

                        var Tpersona_id = generateUUID();
                        var TnombrePersona = $("#nombrePersona").val().toUpperCase();
                        var TapellidoPersona = $("#apellidoPersona").val().toUpperCase();
                        var TfnacimientoPersona = $("#fnacimientoPersona").val();
                        var TtelefonoPersona = $("#telefonoPersona").val();
                        var TcorreoPersona = $("#correoPersona").val();
                        var Tfoto = $('#fotoPersona').val();
                        //PASAJERO

                        var Tpasajero_id = generateUUID();

                        //VALIDACION DE CONTRASEÑAS

                        if((Tcontrasenia==Tcontrasenia2)&&(Tcontrasenia.length >=4)){

                    

                            //OBTENEMOS DATOS DE USUARIO Y DATOS PERSONALES PASAJERO
                            if(Tusuario.length >=5){
                                if((TnombrePersona.length>=1)&&(TapellidoPersona.length>=1)&&
                                  (TfnacimientoPersona.length>=1)&&(TtelefonoPersona.length>=1)&&
                                  (TcorreoPersona.length>=1)){
                                      
                                      $.ajax({
                                        type: "POST", 
                                        url:   window.server + "users/agregar_users.php",
                                        
                                        data: ({
                                            user_id: Tuser_id,
                                            usuario: Tusuario,
                                            contrasenia: Tcontrasenia,
                                            tipousuario: Ttipousuario_id2,
                                            
                                        }),
                                        cache: false,
                                        async: false,
                                        success: function(data){
                                          //alert("Usuario ingresado 1: " + data);
                                          data="";
                                        }
                                      });//fin de ajax usuario

                                      $.ajax({
                                              type: "POST", 
                                              url:   window.server + "personas/agregar_personas.php",
                                              
                                              data: ({
                                                  persona_id: Tpersona_id,
                                                  nombre: TnombrePersona,
                                                  apellido: TapellidoPersona,
                                                  nacimiento: TfnacimientoPersona,
                                                  telefono: TtelefonoPersona,
                                                  correo: TcorreoPersona,
                                                  user_id: Tuser_id,
                                                  
                                              }),
                                              cache: false,
                                              async: false,
                                              dataType: "text",
                                              success: function(data){
                                                data="";
                                              }
                                      });//fin de ajax persona

                                      $.ajax({
                                              type: "POST", 
                                              url:   window.server + "pasajeros/agregar_pasajeros.php",
                                              data: ({
                                                  pasajero_id: Tpasajero_id,
                                                  persona_id: Tpersona_id,
                                                  
                                              }),
                                              cache: false,
                                              async: false,
                                              dataType: "text",
                                              success: function(data){
                                                //alert("PAsajero ingresado 3: " + data);
                                                data="";
                                              }
                                      });//fin de ajax pasajeros

                                      if(Tfoto.length>=1){

                                        e.preventDefault();
                                        var parametros = {
                                          id: Tuser_id,
                                          imagen : jQuery('#vistaPrevia').attr('src')
                                        };
                                        data="";
                                        $.ajax(window.server + 'personas/agregar_foto.php', {
                                          type : 'post',
                                          data : parametros,
                                          success : function(data){
                                                  data="";
                                                }
                                        });




                                      } //else myApp.alert("No se guarda foto", "¡Atención!"); // FIN DE VALIDACION DE FOTO

                                      //SE LIMPIAN CAMPOS
                                     $("#username").val("");
                                     $("#Contrasenia").val("");
                                     $("#Contrasenia2").val("");
                                     $("#nombrePersona").val("");
                                     $("#apellidoPersona").val("");
                                     $("#fnacimientoPersona").val("");
                                     $("#telefonoPersona").val("");
                                     $("#correoPersona").val("");
                                     $('#fotoPersona').val("");
                                     jQuery('#vistaPrevia').attr('src',"");

                                     $('#GuardarPasajero').attr('disabled', true);
                                     myApp.alert("Ingresa a continuación con tus datos.", "Usuario Creado");
                                     mainView.router.back();


                                    } else myApp.alert("Por favor, llenar todos los datos personales", "¡Atención!"); //CIERRE DE VALIDACION PERSONA

                                    

                                               
                            } else myApp.alert("Nombre de Usuario muy corto", "¡Atención!"); //TERMINA IF DE VALIDACION USERNAME

                    } else myApp.alert("Las contraseñas no coinciden o son muy cortas", "¡Atención!"); //TERMINA VALIDACION DE CONTRASEÑA
                    
                  
             }); //FIN FUNCION GUARDAR.CLIC

             $("#username").change(function() {
                var Tusuario = $("#username").val();
                
                $.ajax({
                            type: "POST", 
                            url:  window.server + "users/existe_users.php",
                            data: ({
                                nombre: Tusuario,                                
                            }),
                            
                            cache: false,
                            dataType: "text",
                            success: function(data){
                            
                                if(data){
                                  myApp.alert("El usuario " + Tusuario + " ya existe, intente nuevamente.", "¡Atención!");
                                  $("#username").val("");
                                  $("#username").focus();
                                  $('#GuardarPasajero').attr('disabled', true);
                                }

                                else {
                                    $('#GuardarPasajero').attr('disabled', false);
                                }
                           }
                }); //TERMINA AJAX PARA VERIFICAR USUARIO EXISTENTE

            }); //TERMINA USERNAME.CHANGE

            jQuery('#fotoPersona').on('change', function(e) {
                var Lector,
                oFileInput = this;
             
                if (oFileInput.files.length === 0) {
                    return;
                };
             
                Lector = new FileReader();
                Lector.onloadend = function(e) {
                    jQuery('#vistaPrevia').attr('src', e.target.result);          
                };
                Lector.readAsDataURL(oFileInput.files[0]);
            });

             $("#telefonoPersona").change(function() {
                //alert("change telefono");
                var numero = $('#telefonoPersona').val();
                 if ((!/^([0-9])*$/.test(numero)) || (numero.length<=9)){
                    myApp.alert("El teléfono debe ser de 10 caracteres numéricos", "¡Atención!");
                     $("#telefonoPersona").val("");
                      $("#telefonoPersona").focus();
                 }

            }); //TERMINA USERNAME.CHANGE



}); 
})
