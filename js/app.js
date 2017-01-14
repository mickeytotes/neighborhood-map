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
var markers[];

var initMap = function() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 40.843436, lng: -73.934794},
		zoom: 14
	});

	var infoWindow = new google.maps.InfoWindow();

	// loop through neighborhoodSpots array to make markers.
	for (var i = 0; i < neighborhoodSpots.length; i++) {
		var title = neighborhoodSpots[i].title;
		var position = neighborhoodSpots[i].location;

		var marker = new google.maps.Marker({
			map: map,
			position: position,
			title: title,
			id: i
		});

	// Push markers to markers[] array.
	markers.push(marker);
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