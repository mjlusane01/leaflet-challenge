// Store our API endpoint as queryUrl.
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
  }
  function pointToLayer (feature, latlng) {
    return L.circleMarker(latlng, markerStyle(feature));
  }
  
  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: pointToLayer,
  });

  // Send our earthquakes layer to the createMap function/
  createMap(earthquakes);
}
function markerStyle (feature) {
  return {
      fillColor: markerColor(feature.properties.mag),
      radius: 4*feature.properties.mag,
      weight: 2,
      opacity: 1,
      color: markerColor(feature.properties.mag),
      fillOpacity: 0.9   
  };
};
function markerColor(magnitude) {
  if (magnitude<1) {
    return "#459E22"}
  else if (magnitude<2) {
     return "#7FB20E"}
  else if (magnitude<3) {
     return "#BEBE02"}
  else if (magnitude<4) {
     return "#B19A0F"}
  else if (magnitude<5) {
     return "#B54C0B"}
  else if (magnitude>=5) {
     return "#C00000"}
  else {return "black"}
 };
function createMap(earthquakes) {

  // Create the base layers.
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create a baseMaps object.
  var baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  // Create an overlay object to hold our overlay.
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street, earthquakes]
  });

    colors = ["#459E22", "#7FB20E", "#BEBE02", "#B19A0F", "#B54C0B", "#C00000"];
  
    var legend = L.control({position: 'bottomright'});
  
    legend.onAdd = function () {
  
      var div = L.DomUtil.create('div', 'info legend'),
                    categories = ['<1', '1 to <2', '2 to <3', '3 to <4', '4 to <5', '>5'],
                    labels =[];
      
      div.innerHTML += '<strong> Magnitude </strong> <br>'
      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < categories.length; i++) {
          div.innerHTML +=
              '<i style="background:' + colors[i] + '"></i> ' +
              categories[i] + '<br>';
      };
      return div;
   };
   legend.addTo(myMap)
  };
  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  
  ;

