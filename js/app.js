/* ****** MODEL ******** */

var neighborhoodSpots = [
		{
			title: "Saggio",
			phone: "212-795-3080",
			location: {lat: 40.851473, lng: -73.939588},
			type: "Restaurant",
//			label: "Restaurant"
		},
    	{
    		title: "Mambi Steakhouse",
    		phone: "212-928-9796",
    		location: {lat: 40.84772, lng: -73.938251},
    		type: "Restaurant"
    	},
    	{
    		title: "Planet Fitness",
    		phone: "646-216-3150",
    		location: {lat: 40.847326, lng: -73.937638},
    		type: "Gym",
    //		label:"Gym"
    	},
    	{
    		title: "Le Cheile",
    		phone: "212-740-3111",
    		location: {lat: 40.851495, lng: -73.939988},
    		type: "Restaurant"
    	},
    	{
    		title: "Elite Cleaners",
    		phone: "212-927-5872",
    		location: {lat: 40.843097, lng: -73.939438},
    		type: "Dry Cleaners",
    //		label: "Dry Cleaners"
    	},
    	{
    		title: "Columbia Wine Co",
    		phone: "212-543-2633",
    		location: {lat: 40.842125, lng: -73.939272},
    		type: "Liquor Store",
    //		label: "Liquor Store"
    	}
	]

	//****** VIEW ******** //

var listView = function(data) {
	this.title = ko.observable(data.title);
	this.location = ko.observable(data.location);
	this.type = ko.observable(data.type);
}



// ****** VIEWMODEL ******** //

var ViewModel = function() {
	var self = this;

	this.places = ko.observableArray([]);

	neighborhoodSpots.forEach(function(locationItem) {
		self.places.push(new listView(locationItem));
	});

	this.selectedType = ko.observable();
	this.clearFilter = function() {
		this.selectedType(null)
	}
}

ko.applyBindings(new ViewModel());

// ******** MAP ******** //


var map;

// Create empty arry to push markers into.
var markers = [];

// Get that map going in the map div!
// Thanks to Google Maps API for the super helpful documentation, course, and instructions!
var initMap = function() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 40.843436, lng: -73.934794},
		zoom: 14
	});

	// Close infowindow when any other portion of the map is clicked.
	google.maps.event.addListener(map, "click", function(event) {
		mapInfoWindow.close();
		marker.setIcon(defaultIcon);
	});

	var mapInfoWindow = new google.maps.InfoWindow();

	var defaultIcon = makeMarkerIcon('ff2d00');

	var highlightedIcon = makeMarkerIcon('631504');

	var clickedIcon = makeMarkerIcon('46e91f');

	// loop through neighborhoodSpots array to make markers.
	for (var i = 0; i < neighborhoodSpots.length; i++) {
		var title = neighborhoodSpots[i].title;
		var phone = neighborhoodSpots[i].phone;
		var position = neighborhoodSpots[i].location;

		var marker = new google.maps.Marker({
			map: map,
			position: position,
			title: title,
			phone: phone,
			// markers drop in when page loads.
			animation: google.maps.Animation.DROP,
			icon: defaultIcon,
			id: i
		});


/*	// Make marker bounce on click.
	marker.addListener("click", makeBounce); */

	// Push markers to markers[] array.
	markers.push(marker);

	//Open info window on click.
	marker.addListener("click", function() {
		fillInfoWindow(this, mapInfoWindow);
		// change clicked icon's color.
		this.setIcon(clickedIcon);
	});

	// Change marker color when mouse hovers over marker.
	marker.addListener("mouseover", function() {
		this.setIcon(highlightedIcon);
	});

	// Use default color when not hovering over marker.
	marker.addListener("mouseout", function() {
		this.setIcon(defaultIcon);

		// Make sure icon hasn't been clicked.
		//if (this.setIcon(clickedIcon) = true) {
		//this.setIcon(clickedIcon);
		//} else {
		//	this.setIcon(defaultIcon);
		//}
	});
}

/*	function makeBounce() {
		var bounce = setInterval(function() {
			marker.setAnimation(google.maps.Animation.BOUNCE);
		}, 100);

		setTimeout(function() {
			clearInterval(bounce);
		}, 1000);
	} */


	function fillInfoWindow(marker, infowindow) {
		// Check if marker's window is already open.
		if (infowindow.marker != marker) {
			// Clear infowindow
			infowindow.setContent('');
			infowindow.marker = marker;
			// Open  infowinow
			infowindow.open(map, marker)

			// Close infowindow on click.
			infowindow.addListener('closeclick', function() {
				infowindow.marker(null);
				// Change icon color back to default.
				marker.setIcon(defaultIcon);
			});

			infowindow.setContent("<div>" + marker.title + "</div><div>" + marker.phone + "</div>")

			}
		}

		// This function takes in a color, and then creates a new marker
        // icon of that color. The icon will be 21px wide by 34px high, have an
        // origin of 0, 0 and be anchored at 10, 34. Again, thank you Google API for the help.
      function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
          "https://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|" + markerColor +
          "|40|_|%E2%80%A2",
          new google.maps.Size(21, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34),
          new google.maps.Size(21,34));
        return markerImage;
      }

};