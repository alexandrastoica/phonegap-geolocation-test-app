//when the jQuery Mobile page is initialised
$(document).on('pageinit', function() {
	
	//set up listener for button click
	$('#getLocationButton').on('click', getPosition);
	
	//set up listener for update button set to on
	$(document).delegate("#updateLocation", "tap", function() {
		if($("#updateLocation").val() == 'on'){
		updatePosition();
		} else{
			navigator.geolocation.clearWatch(watchID);
		}
	});
	
	
	//change time box to show message
	$('#time').val("Press the button to get location data");
	
});

function updatePosition(){
	var watchID = navigator.geolocation.watchPosition(success, fail, locationOptions);	
}

function success(position) {
	var lat = position.coords.latitude;
	var lon = position.coords.longitude;
	$('#lattextup').val(lat);
	$('#longtextup').val(lon);
}
function fail(error) {
 //do something with the error 
}

var locationOptions = {
 maximumAge: 10000,
 timeout: 6000,
 enableHighAccuracy: true
};

//Call this function when you want to get the current position
function getPosition() {
	
	//change time box to show updated message
	$('#time').val("Getting data...");
	
	//instruct location service to get position with appropriate callbacks
	navigator.geolocation.getCurrentPosition(successPosition, failPosition);
}


//called when the position is successfully determined
function successPosition(position) {
	
	//You can find out more details about what the position obejct contains here:
	// http://www.w3schools.com/html/html5_geolocation.asp
	

	//lets get some stuff out of the position object
	var unixtime = new Date(position.timestamp);
	var date = unixtime.toDateString();
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	
	//OK. Now we want to update the display with the correct values
	$('#time').val("Recieved data at " + date);
	$('#lattext').val(latitude);
	$('#longtext').val(longitude);
	
}

//called if the position is not obtained correctly
function failPosition(error) {
	//change time box to show updated message
	$('#time').val("Error getting data: " + error);
	
}