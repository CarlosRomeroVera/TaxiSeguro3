myApp.onPageInit('PasajeroEdit', function(page) { 
  var Tpersona_id2;
$(function() {

  $(document).ready(function(){
    $("#showdata").html("");
    document.getElementById('username').innerHTML = "<strong> TU USUARIO:</strong> " + window.user_usuario_global;                    
  });

  $("#guardar").click(function(e) {
                  
    var Tuser_id = window.user_id_global;
    
    var Tcontrasenia = $("#Contrasenia").val();
    var Tcontrasenia2 = $("#Contrasenia2").val();
    

    // DATOS PERSONA

    var Tpersona_id = '0';
    var TnombrePersona = $("#nombrePersona").val();
    var TapellidoPersona = $("#apellidoPersona").val();
    var TfnacimientoPersona = $("#fnacimientoPersona").val();
    var TfotoPersona = $('#fotoPersona').val();
    var TtelefonoPersona = $("#telefonoPersona").val();
    var TcorreoPersona = $("#correoPersona").val();

    if((Tcontrasenia==Tcontrasenia2)&&(Tcontrasenia.length >=4)){
    
       $("#username").val("");
       $("#Contrasenia").val("");
       $("#Contrasenia2").val("");
       $("#nombrePersona").val("");
       $("#apellidoPersona").val("");
       $("#fnacimientoPersona").val("");
       $('#fotoPersona').val("");
       $("#telefonoPersona").val("");
       $("#correoPersona").val("");

        $.ajax({
          type: "POST", 
          url:   window.server + "users/actualizar_users.php",
          data: "",
          data: ({
              user_id: Tuser_id,
              contrasenia: Tcontrasenia,
          }),
          cache: false,
          success: function(data){
          }
        });//fin de ajax usuario

        $.ajax({
          type: "POST", 
          url:   window.server + "personas/actualizar_personas.php",
          data: "",
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
          dataType: "text",
          success: function(data){
          }
        });//fin de ajax persona

        e.preventDefault();
        var parametros = {
          id: window.user_id_global,
          imagen : jQuery('#vistaPrevia').attr('src')
        };
        data="";
        $.ajax(window.server + 'personas/agregar_foto.php', {
          type : 'post',
          data : parametros,
          success : EnviamosContinuar
        });                                       
      
      }else alert("Contraseñas no coinciden o es muy cortaview");

    });

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

    function EnviamosContinuar(data){       
        //$.mobile.changePage( "view/Login/index.html", { transition: "slide", reverse: "false", changeHash: "true" });
        mainView.router.loadPage('view/Viajes/Index.html');
    }
    function EnviamosContinuar2(data){       
        alert("usuario existe");
    }

  }); 

});
