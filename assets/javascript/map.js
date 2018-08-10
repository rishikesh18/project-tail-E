

var map, infoWindow;
var lat = 35.779590;
var lng = -78.638179;
var latArray = []
var lngArray = []

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 35.851, lng: -78.796 },
    zoom: 6
  });
  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      showPins(pos.lat, pos.lng)
      $("#userLocation").text("Latitude: " + pos.lat + ", Longitude: " + pos.lng)
      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function () {
      handleLocationError(true, infoWindow, map.getCenter());
    });

  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

function showPins(lat, lng) {

  var queryURL = "https://trailapi-trailapi.p.mashape.com/?lat=" + lat + "&limit=10&lon=" + lng + "&radius=25";
  $.ajax({
    url: queryURL,
    dataType: 'json',
    headers: {
      "X-Mashape-Key": "sa38JqfW39msh5UFDYOe0Y44RTAEp1jP9K1jsnk52st50qIIvw",
      "Accept": "text/plain"
    },
    method: "get",
    contentType: 'application/json; charset=utf-8',
    success: function (response) {
      console.log(response);
      var myLatLng = { lat: 35.851, lng: -78.796 };
      var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 35.851, lng: -78.796 },
        zoom: 10
      });
      for (var i = 0; i < 10; i++) {
        var lat = response.places[i].lat;
        latArray.push(lat);
        var lng = response.places[i].lon;
        lngArray.push(lng);
        $("#trails").append(response.places[i].name + "<br>")
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(lat, lng),
          map: map,
          title: response.places[i].name
        })
        console.log(marker.position)
        $("#names" + i).html(response.places[i].name)
        $("#location" + i).html(response.places[i].city + ", " + response.places[i].state)
        $("#direction" + i).html(response.places[i].directions)
      }
    }
  })
}

function userSearch(city, state) {

  var queryURL = "https://trailapi-trailapi.p.mashape.com/?limit=10&q[city_cont]=" + city + "&q[state_cont]=" + state + "&radius=25"
  $.ajax({
    url: queryURL,
    dataType: 'json',
    headers: {
      "X-Mashape-Key": "sa38JqfW39msh5UFDYOe0Y44RTAEp1jP9K1jsnk52st50qIIvw",
      "Accept": "text/plain"
    },
    method: "get",
    contentType: 'application/json; charset=utf-8',
    success: function (response) {
      console.log(response);
      var myLatLng = { lat: 35.851, lng: -78.796 };
      bounds = new google.maps.LatLngBounds();
      var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 35.851, lng: -78.796 },
        zoom: 6
      });
      for (var i = 0; i < 10; i++) {
        var lat = response.places[i].lat;
        latArray.push(lat);
        var lng = response.places[i].lon;
        lngArray.push(lng);
        $("#trails").append(response.places[i].name + "<br>")
        //   var myLatLng = { lat: parseInt(lat), lng: parseInt(lng)};
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(lat, lng),
          map: map,
          title: response.places[i].name
        })
        if (i === 0) {
          var laLatLng = new google.maps.LatLng((response.places[i].lat), (response.places[i].lon));
          map.panTo(laLatLng);
          map.setZoom(9);
        }
        console.log(marker.position)
        $("#names" + i).html(response.places[i].name)
        $("#location" + i).html(response.places[i].city + ", " + response.places[i].state)
        $("#direction" + i).html(response.places[i].directions)
      }
    }
  })
}
$(document).ready(function () {
  $("#searchbtn").on("click", function (event) {
    event.preventDefault();
    var cityInput = ($(".inputCity").val().trim());
    var stateInput = ($(".inputState").val().trim());
    console.log(cityInput + stateInput);
    if ((stateInput != "") && cityInput != "") {
      userSearch(cityInput, stateInput)
    }
    else {
      $("#alert").html("Please enter a city and a state")
    }
  });
})
