/*
//console.log("logic.js file called");

queryURL = 'http://127.0.0.1:5000//jsonified';



// Create a new layer group called circleMarkers
var circleMarkers = new L.LayerGroup();

var latExists = 0.0
var lngExists = 0.0

d3.json(queryURL, function(data) {
  response = data[0][0]
  //console.log(response[120].long);
  for (var i = 0; i < response.length; i++) {
    var lat = response[i].lat;
    var lng = response[i].long;
    if (lat && lng) {
      latExists = lat;
      lngExists = lng;
    }    
    var latlng = [latExists, lngExists];
    //console.log(lngExists);
    var circle = L.circle(latlng, {
      fillColor: "red",
      stroke: false,
      fillOpacity: 0.5,
      radius: 700
  }).addTo(circleMarkers);
  circle.bindPopup();
  }
});

var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  accessToken: API_KEY
});

var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "streets-v11",
  accessToken: API_KEY
});

// Define a baseMaps object to hold our base layers
var baseMaps = {
    "Satellite Map": satellitemap,
    "Light Map": lightmap
  };
  
  // Overlays that may be toggled on or off
var overlayMaps = {
    "Properties": circleMarkers
    };

// Define a map object
var myMap = L.map("mapid", {
    center: [51.025036,-114.0411447],
    zoom: 10.5,
    layers: [satellitemap, circleMarkers]
  });

// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
    collapsed: true
  }).addTo(myMap);
  */




  
  var myMap = L.map("mapid", {
    center: [51.025036,-114.0411447],
    zoom: 10.5
  });
  
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
  var url = "http://127.0.0.1:5000//jsonified";
  //var url = "https://data.sfgov.org/resource/cuks-n6tp.json?$limit=10000";
  
  var latExists = 0.0;
  var lngExists = 0.0;

  d3.json(url, function(data) {
    response = data[0][0]
    console.log(response);
  
    var heatArray = [];
  
    for (var i = 0; i < response.length; i++) {
      var lat = response[i].lat;
      var lng = response[i].long;
    if (lat && lng) {
      latExists = lat;
      lngExists = lng;
    }    
    var location = [latExists, lngExists];
    //  var location = response[i].location;
  
      if (location) {
        heatArray.push(location);
      }
    }
  
    var heat = L.heatLayer(heatArray, {
      radius: 50,
      blur: 35
    }).addTo(myMap);
  
  });
  




/*
 var myMap = L.map("mapid", {
  center: [37.7749, -122.4194],
  zoom: 13
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

var url = "https://data.sfgov.org/resource/cuks-n6tp.json?$limit=10000";

d3.json(url, function(response) {

  console.log(response);

  var heatArray = [];

  for (var i = 0; i < response.length; i++) {
    var location = response[i].location;

    if (location) {
      heatArray.push([location.coordinates[1], location.coordinates[0]]);
    }
  }

  var heat = L.heatLayer(heatArray, {
    radius: 20,
    blur: 35
  }).addTo(myMap);

});
*/