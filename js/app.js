/* ****** MODEL ******** */

var neighborhoodSpots = {
		filters: ["None", "Restaurant", "Gym", "Dry Cleaners"],
		spots: [
			{
				title: "Saggio",
				phone: "212-795-3080",
				location: {lat: 40.851473, lng: -73.939588},
				type: "Restaurant",
				foursquareID: "4d21107c6e8c37042b58ff9f"
			},
    		{
    			title: "Mambi Steakhouse",
    			phone: "212-928-9796",
    			location: {lat: 40.84772, lng: -73.938251},
    			type: "Restaurant",
    			foursquareID: "4acce300f964a520e2c920e3"
    		},
    		{
    			title: "Planet Fitness",
    			phone: "646-216-3150",
    			location: {lat: 40.847326, lng: -73.937638},
    			type: "Gym",
    			foursquareID: "53bbf3be498e18ec3a07c2b0"
    		},
    		{
    			title: "Le Cheile",
    			phone: "212-740-3111",
    			location: {lat: 40.851495, lng: -73.939988},
    			type: "Restaurant",
    			foursquareID: "4e77e40118387f865961f673"
    		},
    		{
    			title: "Elite Cleaners",
    			phone: "212-927-5872",
    			location: {lat: 40.843097, lng: -73.939438},
    			type: "Dry Cleaners",
    			foursquareID: "4f31b42ce4b09fde5e534fbb"
    		},
    		{
    			title: "Columbia Wine Co",
    			phone: "212-543-2633",
    			location: {lat: 40.842125, lng: -73.939272},
    			type: "Liquor Store",
    			foursquareID: "506cc066e4b019e8dad3a401"
			}
    	]
	}

// ******** MAP ******** //


var map;



// Create empty arry to push markers into.
//var markers = [];

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
	for (var i = 0; i < neighborhoodSpots.spots.length; i++) {
		var title = neighborhoodSpots.spots[i].title;
		var phone = neighborhoodSpots.spots[i].phone;
		var position = neighborhoodSpots.spots[i].location;
		var id = neighborhoodSpots.spots[i].foursquareID;

		var marker = new google.maps.Marker({
			map: map,
			position: position,
			title: title,
			phone: phone,
			// markers drop in when page loads.
			animation: google.maps.Animation.DROP,
			icon: defaultIcon,
			id: id
		});


/*	// Make marker bounce on click.
	marker.addListener("click", makeBounce); */

	neighborhoodSpots.spots[i].marker = marker;

	// Apply Knockout.js bindings here to ensure markers are created first.
     ko.applyBindings(new ViewModel());

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
	function fillInfoWindow(marker, infowindow) {
		// Check if marker's window is already open.
		if (infowindow.marker != marker) {
			// Clear infowindow
			infowindow.setContent('');
			infowindow.marker = marker;
			// Open  infowinow
			infowindow.open(map, marker);

			// Close infowindow on click.
			infowindow.addListener('closeclick', function() {
				infowindow.marker(null);
				// Change icon color back to default.
				marker.setIcon(defaultIcon);
			});

			// Uncomment this once ajax request is built to get venue info for the infowindow.
			//getFSInfo();

			infowindow.setContent("<div>" + marker.title + "</div><div>" + marker.phone + "</div>");

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



	//****** VIEW ******** //

var listView = function(data) {
	this.title = ko.observable(data.title);
	// Make location an observable in case this needs to be changed
	this.location = ko.observable(data.location);
	this.type = ko.observable(data.type);
	this.marker = data.marker;
	// Create property for visible binding.
	this.isVisible = ko.observable(true);
};

// ****** VIEWMODEL ******** //

var ViewModel = function() {
	var self = this;
	this.selectedType = ko.observable();


	this.places = ko.observableArray([]);

	this.options = ["Liquor Store", "Restaurant", "Dry Cleaners", "Gym"];


	// Push data to observable array.
	neighborhoodSpots.spots.forEach(function(locationItem) {
		self.places.push(new listView(locationItem));
	});

	this.clearFilter = function() {
		this.selectedType(null);
	};

	//this is where I left off
	this.filterList = ko.computed(function() {
		var listPlaces = self.places();
		for (var i = 0; i < listPlaces.length; i++) {
			if (self.selectedType() === undefined) {
				listPlaces[i].isVisible(true);
			}
			else if (self.selectedType() !== listPlaces[i].type()) {
				listPlaces[i].isVisible(false);
				//visibility for the map marker through gmaps api .setVisible method
				//listPlaces[i].marker.setVisible(false);
			} else {
				listPlaces[i].isVisible(true);
				//visibility for the map marker through gmaps api .setVisible method
				//listPlaces[i].marker.setVisible(true);
			}
		}

		console.log("option clicked:", self.selectedType());
		//console.log(self.places());
	});


};

// This is where ko bindings were originally applied.

/*
// ********* foursquare api // ************

var apiURL = "https://api.foursquare.com/v2/venues/";
var foursquareClientID = "EZGUVGZGJDXFSHSJY1FTHZBKDYDPZUGDHQRED30OSMY2XJYO";
var foursquareSecret = "CRZRFZZCTLNTJEOYWDHHKSEMH4DF4G4S0YBBMOIJJ1WYD2TE";
var foursquareVersion = "20170116";
var venueFoursquareID = marker.id;

var foursquareURL = apiURL + venueFoursquareID + "?client_id=" + foursquareClientID +
					"&client_secret=" + foursquareSecret + "&v=" + foursquareVersion;

function getFSInfo(marker, infowindow) {
$.ajax({
	url: foursquareURL,
	success: function(data) {
		var venue = data.response.venue;
		var address = venue.formattedAddress;
		var phone = venue.formattedPhone;

		infowindow.setContent("<div>" + marker.title + "</div><div>" + phone +
			"</div><div>" + address + "</div>");


		console.log(data);
	}
}).fail(function(error) {
	alert("Error retrieving data from Foursquare");
});

}*/