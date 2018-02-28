// document.addEventListener("deviceready", onDeviceReady1, false);

// function onDeviceReady1() {
//     var db = window.openDatabase("taxiSeguro.db3", "1.0", "taxiseguro", 50 * 1024 * 1024);
//     db.transaction(populateDB1, errorCB1, successCB1);
// }
// function errorCB1(tx, err) {
//     alert("Error processing SQL: "+err);
// }

// function successCB1() {
//     // alert("success!");
// }

// function populateDB1(tx) {
//     tx.executeSql("DELETE * FROM `usuarios`");
//     tx.executeSql("CREATE TABLE `usuarios` (`id` TEXT NOT NULL UNIQUE,`nombre` TEXT NOT NULL,PRIMARY KEY(id));");
//     // tx.executeSql("INSERT INTO `usuarios` (id,nombre) VALUES ('fd7aec82-410e-11e5-8d57-4d042ccf8c4d','svivanco');");
// }
// // ********************************************************************************
// function cerrarSesion(){
//     var db = window.openDatabase("taxiSeguro.db3", "1.0", "taxiseguro", 50 * 1024 * 1024);
//     db.transaction(populateDB1, errorCB1, successCB1);
// }
// function salir(){
//     window.qry=("DELETE * FROM `usuarios`");
//     onDeviceReady(); //manda a llamar a Connection
//     onDeviceReady1(); //manda a llamar a Connection
//     // $.mobile.changePage( "../Login/Index.html", { transition: "flip", reverse: "true", changeHash: "false" });
//   }