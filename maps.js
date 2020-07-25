//Array of Markers
var markers = [
  {
    coords: {
      lat: 28.6318,
      lng: 77.1165,
    },
    content: "<span>GTBIT</span>",
  },
  {
    coords: {
      lat: 28.6779,
      lng: 77.2611,
    },
    content: "<span>NIEC</span>",
  },
  {
    coords: {
      lat: 28.7501,
      lng: 77.1177,
    },
    content: "<span>DTU</span>",
  },
  {
    coords: {
      lat: 28.6653,
      lng: 77.2324,
    },
    content: "<span>IGDTUW</span>",
  },
  {
    coords: {
      lat: 28.6078,
      lng: 77.0406,
    },
    content: "<span>NSIT</span>",
  },
  {
    coords: {
      lat: 28.7197,
      lng: 77.0661,
    },
    content: "<span>MAIT</span>",
  },
];

var title = ["GTBIT", "NIEC", "DTU", "IGDTUW", "NSIT", "MAIT"];

var est = [
  "GTBIT was established in 1999",
  "NIEC was established by BBDES, LUCKNOW in 2003",
  "DTU came into existence in the year 1941",
  "IGDTUW was founded  in 1998",
  "NSIT was established in July, 1983",
  "MAIT was established in 1999",
];

var centerloc;

// Calculating Average Latitude of all places
function lat() {
  var latitude = 0;
  for (let i = 0; i < markers.length; i++) {
    latitude += markers[i].coords.lat;
  }

  return latitude / markers.length;
}


// Calculating Average Longitude of all places
function lng() {
  var longitude = 0;
  for (let i = 0; i < markers.length; i++) {
    longitude += markers[i].coords.lng;
  }
  return longitude / markers.length;
}

centerloc = {
  lat: lat(),
  lng: lng(),
};


function initMap() {
  var options = {
    zoom: 10,
    center: centerloc,
  };

  map = new google.maps.Map(document.getElementById("map"), options);

  for (let i = 0; i < markers.length; i++) {
    addMarker(markers[i], i);
  }
}

function addMarker(props, i) {
  var marker = new google.maps.Marker({
    position: props.coords,
    map: map,
    title: "Click to Zoom",
  });
  if (props.content) {
    var infoWindow = new google.maps.InfoWindow({
      content: props.content,
    });

    marker.addListener("mouseover", function () {
      infoWindow.open(map, marker);
    });
    marker.addListener("mouseout", function () {
      infoWindow.close(map, marker);
    });

    google.maps.event.addListener(marker, "click", function () {
      var pos = map.getZoom();
      map.setZoom(14);
      map.setCenter(marker.getPosition());
      cardonmap(i);
      addDirection(i);
      zoomout(pos);
    });

    function zoomout(pos) {
      google.maps.event.addListener(marker, "click", function () {
        
        if (document.getElementById("mcard").style.display == "block") {
          document.getElementById("mcard").style.display = "none";
        } else {
          document.getElementById("mcard").style.display = "block";
        }
        
      map.setZoom(pos);
      
      });
    }
  }
}
