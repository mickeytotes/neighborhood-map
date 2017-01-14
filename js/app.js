// Make dat map doe!

/* ****** MODEL ******** */

var neighborhoodSpots = [
		{
			title: "Saggio",
			location: {lat: 40.851473, lng: -73.939588},
			type: "Restaurant"
		},
    	{
    		title: "Mambi Steakhouse",
    		location: {lat: 40.84772, lng: -73.938251},
    		type: "Restaurant"
    	},
    	{
    		title: "Planet Fitness",
    		location: {lat: 40.847326, lng: -73.937638},
    		type: "Gym"
    	},
    	{
    		title: "Le Cheile",
    		location: {lat: 40.851495, lng: -73.939988},
    		type: "Restaurant"
    	},
    	{
    		title: "Elite Cleaners",
    		location: {lat: 40.843097, lng: -73.939438},
    		type: "Dry Cleaners"
    	},
    	{
    		title: "Columbia Wine Co",
    		location: {lat: 40.842125, lng: -73.939272},
    		type: "Liquor Store"
    	}
	]



// ****** VIEWMODEL ******** //

/*

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

*/

//****** VIEW ******** //

/*

var listView = function(data) {
	this.title = ko.observable(data.title);
	this.location = ko.observable(data.location);
	this.type = ko.observable(data.type);
}

*/

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

	var mapInfoWindow = new google.maps.InfoWindow();

	var defaultIcon = makeMarkerIcon('ff2d00');

	var highlightedIcon = makeMarkerIcon('631504');

	// loop through neighborhoodSpots array to make markers.
	for (var i = 0; i < neighborhoodSpots.length; i++) {
		var title = neighborhoodSpots[i].title;
		var position = neighborhoodSpots[i].location;

		var marker = new google.maps.Marker({
			map: map,
			position: position,
			title: title,
			icon: defaultIcon,
			id: i
		});

	// Push markers to markers[] array.
	markers.push(marker);

	//Open info window on click.
	marker.addListener('click', function() {
		fillInfoWindow(this, mapInfoWindow);
	});

	marker.addListener('click', function() {
		this.setIcon(highlightedIcon);
	});
	}


function fillInfoWindow(marker, infowindow) {
	// Check if marker's window is already open.
	if (infowindow.marker != marker) {
		// Clear infowindow
		infowindow.setContent('');
		infowindow.marker = marker;
		// Open  infowinow
		infowindow.open(map, marker)

		// Close infowindow on click
		infowindow.addListener('closeclick', function() {
			infowindow.marker(null);
			this.setIcon(defaultIcon);
		});

		infowindow.setContent("<div>" + marker.title + "</div>")

	}
}

		// This function takes in a color, and then creates a new marker
       // icon of that color. The icon will be 21px wide by 34px high, have an
      // origin of 0, 0 and be anchored at 10, 34. Again, thank you Google API for the help.
      function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
          'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
          '|40|_|%E2%80%A2',
          new google.maps.Size(21, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34),
          new google.maps.Size(21,34));
        return markerImage;
      }

};




/*function TicketsViewModel() {
	this.tickets = [
	{name: "Economy", price: 199},
	{name: "Business", price: 449},
	{name: "First Class", price: 11199}
	];
	this.chosenTicket = ko.observable();
	this.resetTicket = function() {
		this.chosenTicket(null)
	}
}
ko.applyBindings(new TicketsViewModel());*/