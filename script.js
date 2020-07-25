var latitude;
var longitude;
var locfound;

window.onload = function () {
  if (navigator.geolocation) {
    if (navigator.geolocation) {
      locfound = true;
      navigator.geolocation.getCurrentPosition(findPos, findErr);
    }
  }
};

//To find device's location
function findPos(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
}

function findErr() {
  locfound = false;
}

var gtbit =
  "Guru Tegh Bahadur Institute of Technology (GTBIT) is a private engineering college affiliated to Guru Gobind Singh Indraprastha University , Delhi. It was established in 1999 by the Delhi Sikh Gurudwara Management Committee (DSGMC).GTBIT is a degree level technical institute, approved by AICTE. The college has been named after 9th Sikh Guru, Guru Tegh Bahadur.";

var niec =
  "Dr. Akhilesh Das Gupta Institute of Technology and Management, formerly known as Northern India Engineering College, is a private engineering college located in New Delhi, India. It was established in 2003 by the Babu Banarasi Das Educational Society. It offers under-graduate and post-graduate level full-time programs approved by AICTE in affiliation with Guru Gobind Singh Indraprastha University.The college is located in Shastri Park, Delhi. The lush green campus is approximately 9 acres (36,000 m2) in size and consists of five interconnected blocks.The college offers Bachelor of Technology (B.Tech) courses in various fields as well as Bachelor of Business Administration (BBA) and Master of Business Administration (MBA).";

var dtu =
  "Delhi Technological University (DTU), formerly known as the Delhi College of Engineering (DCE) is a public university located in New Delhi, India. It was established in 1941 as Delhi Polytechnic under the control of the Government of India. It is Delhi's first Engineering college and amongst the few engineering institutions in India set up prior to independence. DTU offers courses towards Bachelor of Technology (BTech), Master of Technology (MTech), Doctor of Philosophy (PhD), Master in Science(Msc.) and Master of Business Administration (M.B.A) under the name of Delhi School of Management (DSM) and contains fourteen academic departments. ";

var igdtuw =
  "Indira Gandhi Delhi Technical University for Women (IGDTUW) has been upgraded from Indira Gandhi Institute of Technology in May 2013 vide Delhi State Legislature Act 9, 2012, as a non-affiliating teaching and research University at Delhi to facilitate and promote studies, research, technology, innovation, incubation and extension work in emerging areas of professional education among women, with focus on engineering, technology, applied sciences, management and its allied areas with the objective to achieve excellence in these and related fields.";

var nsit =
  "Netaji Subhas University of Technology (NSUT), formerly Netaji Subhas Institute of Technology (NSIT) is an engineering college located in Dwarka, New Delhi, India. Following the conversion of the Delhi College of Engineering into Delhi Technological University, Cluster Innovation Centre and NSIT were the only engineering institutions under the University of Delhi. In 2018, the college was given university status, thus changing its name to Netaji Subhas University of Technology";

var mait =
  "Maharaja Agrasen Institute of Technology (MAIT) is a private engineering college, located in Rohini, Delhi, India. The institute is approved by AICTE and affiliated to Guru Gobind Singh Indraprastha University.MAIT’s campus is composed of 10 blocks with a learning resource centre.";

var cards = document.getElementsByClassName("cards");

for (i = 0; i < cards.length; i++) {
  getCard(i);
}

function getCard(i) {
  cards[i].addEventListener("click", function () {
    selectcard(i);
  });
}

var heading;
var content;

//To select a card
function selectcard(i) {
  switch (i) {
    case 0:
      heading = "GTBIT";
      content = gtbit;
      break;
    case 1:
      heading = "NIEC";
      content = niec;
      break;
    case 2:
      heading = "DTU";
      content = dtu;
      break;
    case 3:
      heading = "IGDTUW";
      content = igdtuw;
      break;
    case 4:
      heading = "NSIT";
      content = nsit;
      break;
    case 5:
      heading = "MAIT";
      content = mait;
      break;
  }

  showInfo();
  scrollTop();
  zoomonMap(i);
  cardonmap(i);
  addDirection(i);
  findDistance(i);
}

//To show info
function showInfo() {
  document.getElementById("heading").innerHTML = heading;
  document.getElementById("content").innerHTML = content;
  document.getElementById("expandDiv").style.display = "block";
}


function scrollTop() {
  document.body.scrollTop = 260;
  document.documentElement.scrollTop = 260;
}

function zoomonMap(i) {
  var lat = markers[i].coords.lat;
  var lng = markers[i].coords.lng;
  var pos = map.getZoom();
  map.setZoom(14);
  map.setCenter({ lat, lng });
  close(pos);
}


function close(pos) {
  var closeButton = document.getElementById("close");
  closeButton.addEventListener("click", function () {
    document.getElementById("expandDiv").style.display = "none";
    document.getElementById("mcard").style.display = "none";
    map.setZoom(pos);
  });
}

function cardonmap(i) {
  document.getElementById("mcard").style.display = "block";
  document.getElementById("mcard-title").innerHTML =
    "<strong>" + title[i] + "</strong>";
  document.getElementById("mcard-est").innerHTML = "<p>" + est[i] + "</p>";
}

function addDirection(i) {
  var nav = document.getElementById("navigation");
  nav.addEventListener("click", function () {
    nav.href =
      "https://www.google.com/maps/dir//" +
      markers[i].coords.lat +
      "," +
      markers[i].coords.lng +
      "/@" +
      markers[i].coords.lat +
      "," +
      markers[i].coords.lng +
      ",16z?hl=en";
  });
}

function findDistance(i) {
  // Using Haversine Formula
  var R = 6371e3;                        // R in metres
  var φ1 = (latitude * Math.PI) / 180;   // φ, λ in radians
  var φ2 = (markers[i].coords.lat * Math.PI) / 180;
  var Δφ = ((latitude - markers[i].coords.lat) * Math.PI) / 180;
  var Δλ = ((longitude - markers[i].coords.lng) * Math.PI) / 180;

  var a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  var dist = (R * c) / 1000; // converting metres into kilometres

  footer(dist, i);
}

function footer(dist, i) {
  if (locfound == false) {
    document.getElementById("footer").innerHTML =
      "Reload and give location access";
  } else {
    var lat = markers[i].coords.lat.toString();
    var lng = markers[i].coords.lng.toString();
    var loc = "Distance from your location : " + dist.toFixed(2);
    document.getElementById("footer").innerHTML =
      "lat:  " + lat + "  lng: " + lng + "<br/>" + loc + "km";
  }
}
