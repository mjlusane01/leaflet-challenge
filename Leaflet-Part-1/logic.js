/ Store our API endpoint inside a query

var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"




var query2 = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson"




// Perform a GET request

d3.json(queryUrl, function(data) {



  createFeatures(data.features);

});




function createFeatures(earthquakeData) {







  // describe the place and time of the earthquake

  function onEachFeature(feature, layer) {

    layer.bindPopup("<h3>" + feature.properties.place +

      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" +

      "</h3><hr><p>Magnitude: " + feature.properties.mag + "</p>");

  }




  




  // Create a GeoJSON layer 



  var earthquakes = L.geoJSON(earthquakeData, {

    onEachFeature: onEachFeature,

    pointToLayer: function (feature, latlng) {

      var color;

      var r = 255;

      var g = Math.floor(255-80*feature.properties.mag);

      var b = Math.floor(255-80*feature.properties.mag);

      color= "rgb("+r+" ,"+g+","+ b+")"

      

      var geojsonMarkerOptions = {

        radius: 4*feature.properties.mag,

        fillColor: color,

        color: "black",

        weight: 1,

        opacity: 1,

        fillOpacity: 0.8

      };

      return L.circleMarker(latlng, geojsonMarkerOptions);

    }

  });
{

}

