// Make dat map doe!

var map;

var initMap = function() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 40.843436, lng: -73.934794},
		zoom: 14
	});
};