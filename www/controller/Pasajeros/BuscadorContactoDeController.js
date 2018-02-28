myApp.onPageInit('ContactosDe', function (page) {
	// alert('ok');
    document.getElementById('buscarContactoDe').focus();
	javascript:window.history.forward(1);
	document.onkeydown = function(e){
  
	    e=window.event;
	    if(!window.event)return false;
	 	if(e.keyCode == 37 && e.altKey==true )
		{return false;} 
		if((e.keyCode == 116 || e.keyCode == 82) && e.ctrlKey==true)
		{return false;} 
	    if(e.keyCode == 13)
		{return false;} 
	}
	$("#buscarContactoDe").on('keyup', function(){
        var value = $(this).val();
        $.ajax({
	        type: 'POST', 
	        url:  window.server + 'buscadorContactoDe.php',
	        data:   ({
	                    match: value,
	                    user_id: window.user_id_global
	                }),
	        cache: false,
	        dataType: 'text',
	        success: function(data){
	            
	            if(data != 'error'){
	                var obj = $.parseJSON(data);
	                //alert(obj.funcionario.length);
	        		var html = '';
	                $.each(obj, function(i,contacto){
	                    html = html + "<li>";
						    html = html + "<a href='view/Pasajeros/detailContactoDe.html' onclick='asignaId("+'"'+contacto.id+'"'+");' class='item-link item-content' id='cl'> ";
						    html = html + "<div class='item-inner'>";
							    html = html + "<div class='item-title-row'>";
								    html = html + "<div class='item-title'>" + contacto.nombre + ' ' + contacto.apellido + "</div>";
							    html = html + "</div>";
							    html = html + "<div class='item-after'>" + contacto.telefono +"</div>";
						    html = html + "</div>";
						    html = html + "</a>";
					    html = html + "</li>";
	                });
	                $("#resultsContactoDe").html(html);
	      //           if (obj.length == 1) {
	      //           	$.each(obj.contacto, function(i,contacto){
							// asignaId(contacto.id);
	      //           	});
	        			
	      //   			mainView.router.loadPage('view/Chofer/detail.html');
	      //   		}
	            }
	            else{
	                myApp.alert('Verifique conexión e intente de nuevo', '¡Atención!');
	            }
	        }
	    });//fin de ajax
    }).keyup();

    $("#AgregarContacto").click(function(e) {
        var contactoId = generateUUID();
        var nombreContacto = $("#nombreContacto").val();
        var telefonoContacto = $("#telefonoContacto").val();
        var userId = window.user_id_global;
        $.ajax({
                type: "POST", 
                url:   window.server + "users/agregar_contactos.php",
                
                data: ({
                    contactoId: contactoId,
                    nombreContacto: nombreContacto,
                    telefonoContacto: telefonoContacto,
                    userId: userId,
                    
                }),
                cache: false,
                async: false,
                success: function(data){
                  //alert("Usuario ingresado 1: " + data);
                  // data="";
                  // if (data == 'ok') {}
                  myApp.closeModal('.popup-contacto');

                }
              });//fin de ajax usuario
        $("#nombreContacto").val("");
        $("#telefonoContacto").val("");
    });
});