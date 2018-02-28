myApp.onPageInit('DetallesUser', function (page) {
    cont = 0;
	//alert(window.resultado_id);
	$.ajax({
        type: 'POST', 
        url:  window.server + 'obtener_detalles.php',
        data:   ({
                    id: window.resultado_id,
                    evento: window.evento_id,
                }),
        cache: false,
        dataType: 'text',
        success: function(data){
            var obj = $.parseJSON(data);
            var html = '';
            $.each(obj, function(i,persona){
                if(data != 'Error'){
                    // alert(persona.nombre);
                    // document.
                    $('#nombreContactoEdit').val(persona.nombre+' '+persona.apellido);
                    $('#telefonoContactoEdit').val(persona.telefono);
                    $("#fotoContacto").attr("src",persona.foto);
                }
                else{
                    myApp.alert('Verifique conexión e intente de nuevo', '¡Atención!');
                }
            });
        }
    });//fin de ajax

    $$('#EliminarRelacion').on('click', function(){
        
        $.ajax({
            type: 'POST', 
            url:  window.server + 'eliminarContactoDe.php',
            data:   ({
                        id: generateUUID(),
                        contactoId: window.user_id_global,
                        pasajeroId: window.resultado_id
                        // contactoNombre: $('#nombreContactoEdit').val(),
                        // contactoTelefono: $('#telefonoContactoEdit').val()
                    }),
            cache: false,
            dataType: 'text',
            success: function(data){
                if (data == 'ok') {
                    myApp.alert('Eliminado', '¡Atención!');
                    mainView.router.back();
                }else{
                    myApp.alert(data, '¡Atención!');
                    mainView.router.back();
                }
                // alert(data);
                // if(data == 'ok'){
                //     myApp.alert('Guardado', '¡Atención!');
                //     mainView.router.back();
                    
                // }else if(data == 'Ya agregado'){
                //     myApp.alert('Contacto previamente agregado', '¡Atención!');
                //     mainView.router.back();
                // }
                // else{
                //     myApp.alert(data, '¡Atención!');
                // }
            }
        });//fin de ajax
        
        $('#contrasenia').val(''); 
        //var formData = myApp.formToData('#LoginForm');
        //alert(JSON.stringify(formData));
    });  
});