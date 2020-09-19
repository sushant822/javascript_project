// var newYorkCoords = [40.73, -74.0059];
// var mapZoomLevel = 12;

// Create the createMap function


  // Create the tile layer that will be the background of our map


  // Create a baseMaps object to hold the lightmap layer


  // Create an overlayMaps object to hold the bikeStations layer


  // Create the map object with options


  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map

// Create the createMarkers function

  // Pull the "stations" property off of response.data

  // Initialize an array to hold bike markers

  // Loop through the stations array
    // For each station, create a marker and bind a popup with the station's name

    // Add the marker to the bikeMarkers array

  // Create a layer group made from the bike markers array, pass it into the createMap function


// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete


var myMap = L.map("map-id", {
  center: [40.73, -74.0059],
  zoom: 12
});

// Add a tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

var queryURL = 'https://gbfs.citibikenyc.com/gbfs/en/station_information.json'
// An array containing each city's name, location, and population

d3.json(queryURL, function(response) {
  //var cities = data.stations;
  var coordinates = response.data.stations;
  //console.log(temp);
  for (var i = 0; i < coordinates.length; i++) {
    var lat = coordinates[i].lat;
    var lng = coordinates[i].lon;
    var temp = [lat, lng];
    //console.log(temp);
    var name = coordinates[i].name;
    var capacity = coordinates[i].capacity;
    L.marker(temp)
    .bindPopup("<h1>" + name + "</h1> <hr> <h3>Capacity " + capacity + "</h3>")
    .addTo(myMap);
  }
});


// Loop through the cities array and create one marker for each city, bind a popup containing its name and population add it to the map
/*
for (var i = 0; i < cities.length; i++) {
  var city = cities[i];
  L.marker(city.location)
    .bindPopup("<h1>" + city.name + "</h1> <hr> <h3>Population " + city.population + "</h3>")
    .addTo(myMap);
}
*/