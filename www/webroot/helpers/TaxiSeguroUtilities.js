function cleanAll(){
 
    //SE TIENEN QUE INGRESAR TODOS LOS NOMBRES DE LAS VISTAS
    var view = [];
    view.push('ViewCatalogos');
    view.push('ViewUbicacionPasajero');
    view.push('ViewUsersSave');
    view.push('IndexIndex');
    //view.push('LoginIndex');
    view.push('menu');

    $.each(view, function( index, value ) {

        $( "#" + value).remove();
        console.log("Limpia: " + value);
    });
}


function cleanUp(page){
    console.log("se limpia " + page);
    $( "#" + page).remove();
}


function destroyAll(){
    var e = document.body;
    e.parentNode.removeChild(e);

    var e = document.head;
    e.parentNode.removeChild(e);

    console.log("DESTROYED!")
}


 function generateUUID() {
          var d = new Date().getTime();
      
          var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
              var r = (d + Math.random()*16)%16 | 0;
              d = Math.floor(d/16);
              return (c=='x' ? r : (r&0x7|0x8)).toString(16);
          });
          return uuid;
      };