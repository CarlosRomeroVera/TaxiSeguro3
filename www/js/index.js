var platform;
function onDeviceReady() {

    grantedDevice = 0;

    platform = device.platform.toLowerCase();
    if(platform.match(/win/)){
        platform = "windows";
    }

    // Bind events
    $(document).on("resume", onResume);

    // Register change listeners for iOS+Android
    if(platform === "android" || platform === "ios") {

        cordova.plugins.diagnostic.registerLocationStateChangeHandler(function (state) {

            //alert('Ahora tu gps está: '+ state);
            checkState();
        }, function (error) {
            alert("Error registering for location state changes: " + error);
        });
    }

    // Register change listeners for Android
    if(platform === "android"){
        cordova.plugins.diagnostic.registerPermissionRequestCompleteHandler(function(statuses){
            console.info("Permission request complete");
            for (var permission in statuses){
                switch(statuses[permission]){
                    case cordova.plugins.diagnostic.permissionStatus.GRANTED:
                        console.log("Permission granted to use "+permission);
                        grantedDevice = 1;
                        break;
                    case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
                        console.log("Permission to use "+permission+" has not been requested yet");
                        break;
                    case cordova.plugins.diagnostic.permissionStatus.DENIED:
                        console.log("Permission denied to use "+permission);
                        break;
                    case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
                        console.log("Permission permanently denied to use "+permission);
                        break;
                }
            }
        });
    }


    // iOS settings
    var onLocationRequestChange = function(status){
        alert("Successfully requested location authorization: authorization was " + status);
        checkState();
    };
    // $('#request-location-always').on("click", function(){
    //     cordova.plugins.diagnostic.requestLocationAuthorization(onLocationRequestChange, function(error){

    //         alert(error);
    //     }, cordova.plugins.diagnostic.locationAuthorizationMode.ALWAYS);
    // });

    // $('#request-location-in-use').on("click", function(){
    //     cordova.plugins.diagnostic.requestLocationAuthorization(onLocationRequestChange, function(error){

    //         alert(error);
    //     }, cordova.plugins.diagnostic.locationAuthorizationMode.WHEN_IN_USE);
    // });

    // // Android settings
    // $('#request-location').on("click", function(){
    //     cordova.plugins.diagnostic.requestLocationAuthorization(function(status){
    //         console.log("Successfully requested location authorization: authorization was " + status);
    //     }, function(error){

    //         alert(error);
    //     });
    // });


    if(platform === "ios") {
        // Setup background refresh request
        var Fetcher = window.BackgroundFetch;
        var fetchCallback = function() {
            console.log('BackgroundFetch initiated');
            $.get({
                url: 'index.html',
                callback: function(response) {
                    console.log("BackgroundFetch successful");
                    Fetcher.finish();
                }
            });
        };
        var failureCallback = function() {
            console.error('- BackgroundFetch failed');
        };
        Fetcher.configure(fetchCallback, failureCallback, {
            stopOnTerminate: true
        });

        // Setup push notifications
        var push = PushNotification.init({
            "android": {
                "senderID": "123456789"
            },
            "ios": {
                "sound": true,
                "alert": true,
                "badge": true
            },
            "windows": {}
        });

        push.on('registration', function(data) {
            console.log("registration event: " + data.registrationId);
        });

        push.on('error', function(e) {
            console.log("push error = " + e.message);
        });
    }

    setTimeout(checkState, 500);
}


function checkState(){
    // Location
    var onGetLocationAuthorizationStatus;
    cordova.plugins.diagnostic.isLocationAvailable(function(available){
        // $('#state .location').addClass(available ? 'on' : 'off');

        //alert('isLocationAvailable');
        var info = (available ? 'on' : 'off');
        //alert(info);
        if (info == 'off' && grantedDevice == 1) {
            alert('Porfavor, enciende tu GPS');
            cordova.plugins.diagnostic.switchToLocationSettings();
        }
    }, onError);


    if(platform === "ios"){
        onGetLocationAuthorizationStatus = function(status){
            alert(status === cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED);
        }
    }

    if(platform === "android"){
        cordova.plugins.diagnostic.isGpsLocationAvailable(function(available){
            // $('#state .gps-location').addClass(available ? 'on' : 'off');
            // alert('isGpsLocationAvailable');
            // var info = (available ? 'on' : 'off');
            // alert(info);
            // if (info == 'off') {
            //     cordova.plugins.diagnostic.switchToLocationSettings();
            // }
        }, onError);

        cordova.plugins.diagnostic.isNetworkLocationAvailable(function(available){
            // $('#state .network-location').addClass(available ? 'on' : 'off');
            // alert('isNetworkLocationAvailable');
            // var info = (available ? 'on' : 'off');
            // alert(info);
            // if (info == 'off') {
            //     cordova.plugins.diagnostic.switchToLocationSettings();
            // }
        }, onError);

    }
}

function onError(error){
    alert("An error occurred: "+error);
}

function onResume(){
    checkState();
}

$(document).on("deviceready", onDeviceReady);