// Make dat map doe!


var model = [
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


var map;

var initMap = function() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 40.843436, lng: -73.934794},
		zoom: 14
	});
};