// ******** MODEL ********

var neighborhoodSpots = [
			{
				title: "Saggio",
				location: {lat: 40.851473, lng: -73.939588},
				type: "Restaurant",
				foursquareID: "4d21107c6e8c37042b58ff9f"
			},
    		{
    			title: "Mambi Steakhouse",
    			location: {lat: 40.84772, lng: -73.938251},
    			type: "Restaurant",
    			foursquareID: "4acce300f964a520e2c920e3"
    		},
    		{
    			title: "Planet Fitness",
    			location: {lat: 40.847326, lng: -73.937638},
    			type: "Gym",
    			foursquareID: "53bbf3be498e18ec3a07c2b0"
    		},
    		{
    			title: "Le Cheile",
    			location: {lat: 40.851495, lng: -73.939988},
    			type: "Restaurant",
    			foursquareID: "4e77e40118387f865961f673"
    		},
    		{
    			title: "Elite Cleaners",
    			location: {lat: 40.843097, lng: -73.939438},
    			type: "Dry Cleaners",
    			foursquareID: "4f31b42ce4b09fde5e534fbb"
    		},
    		{
    			title: "Columbia Wine Co",
    			location: {lat: 40.842125, lng: -73.939272},
    			type: "Liquor Store",
    			foursquareID: "506cc066e4b019e8dad3a401"
			}
    	]

// ******** MAP ******** //

var map;


// Get that map going in the map div!
// Callback function for the google maps request in index.html
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

	// loop through neighborhoodSpots array to make markers that correspond to each "spot."
	for (var i = 0; i < neighborhoodSpots.length; i++) {
		var title = neighborhoodSpots[i].title;
		var phone = neighborhoodSpots[i].phone;
		var position = neighborhoodSpots[i].location;
		var id = neighborhoodSpots[i].foursquareID;

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

	// Make each marker a property of its corresponding neighborhoodSpot.
	neighborhoodSpots[i].marker = marker;

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
	});
}

	// Called when each marker is clicked. Populates infowindow with corresponding information.
	function fillInfoWindow(marker, infowindow) {
		// Check if marker's window is already open.
		if (infowindow.marker != marker) {
			// Clear infowindow
			//infowindow.setContent('');
			infowindow.marker = marker;
			// Open  infowinow
			//infowindow.open(map, marker);

			// Close infowindow on click.
			infowindow.addListener('closeclick', function() {
				infowindow.marker(null);
				// Change icon color back to default.
				marker.setIcon(defaultIcon);
			});

			// Call ajax request to get info from foursquare and populate infowindow.
			getFSInfo(marker, infowindow);
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

      // Apply Knockout.js bindings here to ensure markers are created first.
      ko.applyBindings(new ViewModel());
};


//  ****** VIEW ******** //

var listView = function(data) {
	this.title = data.title;
	this.location = data.location;
	this.type = data.type;
	this.marker = data.marker;
	// Create property for visible binding.
	this.isVisible = ko.observable(true);
};

// ****** VIEWMODEL ******** //

var ViewModel = function() {
	var self = this;

	this.selectedType = ko.observable();

	this.places = ko.observableArray([]);

	// Array for the options menu.
	this.options = ["Liquor Store", "Restaurant", "Dry Cleaners", "Gym"];


	// Push data to observable array.
	neighborhoodSpots.forEach(function(locationItem) {
		self.places.push(new listView(locationItem));
	});

	this.clearFilter = function() {
		this.selectedType(null);
	};

	// This handles the visibility of the list items, as well as markers.
	this.filterList = ko.computed(function() {
		var listPlaces = self.places();
		for (var i = 0; i < listPlaces.length; i++) {
			if (self.selectedType() === undefined) {
				listPlaces[i].isVisible(true);
				listPlaces[i].marker.setVisible(true);
			}
			else if (self.selectedType() !== listPlaces[i].type()) {
				console.log(listPlaces[i]);
				listPlaces[i].isVisible(false);
				//visibility for the map marker through gmaps api .setVisible method
				listPlaces[i].marker.setVisible(false);
			} else {
				listPlaces[i].isVisible(true);
				//visibility for the map marker through gmaps api .setVisible method
				listPlaces[i].marker.setVisible(true);
			}
		}
	});

	this.openFromList = function(location) {
        google.maps.event.trigger(location.marker,'click');
      };


};



// ********* FOURSQUARE API ************
// Used to grab location's phone number and formatted address for the infowindow.

var apiURL = "https://api.foursquare.com/v2/venues/";
var foursquareClientID = "EZGUVGZGJDXFSHSJY1FTHZBKDYDPZUGDHQRED30OSMY2XJYO";
var foursquareSecret = "CRZRFZZCTLNTJEOYWDHHKSEMH4DF4G4S0YBBMOIJJ1WYD2TE";
var foursquareVersion = "20170116";


function getFSInfo(marker, infowindow) {
	var venueFoursquareID = marker.id;

	var foursquareURL = apiURL + venueFoursquareID + "?client_id=" + foursquareClientID +
					"&client_secret=" + foursquareSecret + "&v=" + foursquareVersion;
	$.ajax({
		url: foursquareURL,
		success: function(data) {
			var venue = data.response.venue;
			var address = venue.location.formattedAddress;
			var phone = venue.contact.formattedPhone;

			infowindow.setContent("<div>" + marker.title + "</div><div>" + phone +
				"</div><div>" + address + "</div>");

			infowindow.open(map, marker);

		}
	//If foursquare api fails:
	}).fail(function(error) {
		alert("Error retrieving data from Foursquare");
	});

}

// This is called by the Google Maps request if the map request fails.
function googleError() {
	alert("Google Maps failed to load. Check internet connection or try again later.");
};

//slider provided by Kasper Taeymans on stackoverflow.com
//http://stackoverflow.com/questions/21416282/slide-a-div-in-
//from-off-screen-and-then-back-on-toggle

$("#filter-button").on("click", function() {
	$("#list-container").toggleClass("closed");
})
