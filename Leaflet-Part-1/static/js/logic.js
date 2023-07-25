// Store API endpoint
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

// Perofrm a GET request to url
d3.json(url).then(function(data){
    // Once we get a respose, send data.features object to createFeatures Function
    createFeatures(data.features)
})

function createFeatures(earthquakeData){
    // Define a function that we want to run once for each feawture in the feature arrary
    function onEachFeature(feature,layer){
        layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p><hr><p>Magnitude: ${feature.properties.mag}</p><hr><p>Depth: ${feature.geometry.coordinates[2]}</p>`)
    }
    function createMarker(feature, latlong){
        let options = {
            radius: feature.properties.mag*3,
            fillColor: pickColor(feature.properties.mag),
            color: pickColor(feature.properties.mag),
            fillOpacity: pickOpacity(feature.geometry.coordinates[2])

        }
        return L.circleMarker(latlong, options)
    }
    // Create a GeoJSON layer that contains the features array on the earthquakeData object
    // Run on Each Feature function once for each piece of data in the array
    let earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
        pointToLayer: createMarker
    })
    // Send our earthquakes layer to the createMap function
    createMap(earthquakes)
}

function pickOpacity(depth){
    if (depth < 100){
        return .2
    }
    else if (depth < 200){
        return .4
    }
    else if (depth < 300){
        return .6
    }
    else if (depth < 400){
        return .8
    }
    else if (depth > 400){
        return 1
    }
}

function pickColor(mag){
    if (mag < 1){
        return "green"
    }
    else if (mag < 3){
        return "greenyellow"
    }
    else if (mag < 5){
        return "yellow"
    }
    else if (mag < 7){
        return "orange"
    }
    else if (mag < 9){
        return "red"
    }
    else {
        return "maroon"
    }
}


// Create a legend
let info = L.control({
    position: "bottomright"
})


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
};
    




function createMap(earthquakes){
    // Create the base layers
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      })

    let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      });
    
    // Create baseMaps object
    let baseMaps = {
        "Topographic Map": topo,
        "Street Map": street
    }

    // Create overlay object to hold overlay
    let overlayMaps = {
        Earthquakes: earthquakes
    }

    // Create our map
    let myMap = L.map("map", {
        center: [
          37.09, -95.71
        ],
        zoom: 5,
        layers: [street, earthquakes]
      });

    // Create layer control
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
    // Add the info legend to the map.
    info.addTo(myMap);
    

    
}



