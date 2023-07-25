# leaflet-challenge

The purpose of this project was to visualize earthquake data to better illustrate the issues facing the environment.

GeoJSON data was loaded from the United States Geological Survery and earthquakes were displayed based on their location, magnitude and depth.

Code from StackExchange was gathered to help build the legend (https://gis.stackexchange.com/questions/331314/leaflet-geojson-map-legend)

        // When the layer control is added, insert a div with the class of "legend".
        info.onAdd = function() {
        let div = L.DomUtil.create("div", "info legend");
        labels = []
        legendInfo =["Magnitude"]
        Categories = [1,3,5,7,9]
        for (var i = 0; i < Categories.length; i++) {
            labels.push('<ul style="background-color:' + pickColor(Categories[i]+1) + '"> <span>' + Categories[i] + (Categories[i + 1] ? '&ndash;' + Categories[i +1 ] + '' : '+') + '</span></ul>');
          }

       // add each label list item to the div under the <ul> tag
        div.innerHTML += "<ul>" + labels.join("") + "</ul>";
  
        return div;
        }